// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IERC20 {
    function allowance(address owner, address spender) external view returns (uint256); // ✅ Add this function
    function approve(address spender, uint256 amount) external returns (bool); // ✅ Optional but needed for approve() calls
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function updateCustomData(address user, uint256 tokens, uint256 unBlockingTime) external;
}

interface IBitsiCapitalReserve {
    function addFunds(uint256 amount, bool isUSDT) external;
    function lockFunds(address user, uint256 amount, bool isUSDT) external;
    function unlockUSDT(address user, uint256 amount) external;
    function unlockBITSI(address user, uint256 amount) external;
    function unlockUSDTAndLockBITSI(address user, uint256 usdtAmount, uint256 bitsiAmount) external;
    function withdrawCompensation(address user, uint256 amount) external;
    function getLockedFunds(address user, bool isUSDT) external view returns (uint256);
    function getBitsiBalance() external view returns (uint256);
    function getUSDTBalance() external view returns (uint256);
}

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract WhitelistManager is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}
    mapping(address => bool) private policyWhitelist;
    mapping(address => bool) private compensationWhitelist;

    event PolicyWhitelisted(address indexed user, bool status);
    event CompensationWhitelisted(address indexed user, bool status);

    function isPolicyWhitelisted(address _user) public view returns (bool) {
        return policyWhitelist[_user];
    }
    function isCompensationWhitelisted(address _user) public view returns (bool) {
        return compensationWhitelist[_user];
    }
    function addPolicyWhitelist(address _user) public onlyOwner {
        require(!policyWhitelist[_user], "Already whitelisted for policy");
        policyWhitelist[_user] = true;
        emit PolicyWhitelisted(_user, true);
    }
    function addCompensationWhitelist(address _user) public onlyOwner {
        require(!isCompensationWhitelisted(_user), "Already whitelisted for compensation");
        compensationWhitelist[_user] = true;
        emit CompensationWhitelisted(_user, true);
    }
    function removePolicyWhitelist(address _user) public onlyOwner {
        require(policyWhitelist[_user], "Not whitelisted for policy");
        policyWhitelist[_user] = false;
        emit PolicyWhitelisted(_user, false);
    }
    function removeCompensationWhitelist(address _user) public onlyOwner {
        require(isCompensationWhitelisted(_user), "Not whitelisted for compensation");
        compensationWhitelist[_user] = false;
        emit CompensationWhitelisted(_user, false);
    }
}

contract BitsiInsurance is WhitelistManager {
    constructor(
        address _bitsiToken, // Bitsi token address
        address _usdtToken, // ✅ Add USDT token address
        address _capitalReserve,
        address _compensationFundWallet,
        address _adminAddress, // ✅ Add price updater
        uint256[] memory contractDurationsInYears) WhitelistManager(_adminAddress) {
            bitsiToken = IERC20(_bitsiToken); // ✅ Assign bitsiToken
            usdtToken = IERC20(_usdtToken); // ✅ Assign USDT token
            capitalReserve = IBitsiCapitalReserve(_capitalReserve);
            compensationFundWallet = _compensationFundWallet;
            adminAddress = _adminAddress; // ✅ Set initial adminAddress
            for (uint256 i = 0; i < contractDurationsInYears.length; i++) {
                insuranceDurations[contractDurationsInYears[i]] = contractDurationsInYears[i] * 365 days;
            }
    }
    struct Policy {
        uint256 policyId;
        address userId;
        uint256 bitsiAmount;
        uint256 bitsiPrice;
        address currency;
        uint256 insurancePremium;
        uint256 startDate;
        uint256 expirationDate;
        uint256 claimTime;
        uint256 INSURANCE_PERIOD;
        uint256 compensation;
        uint256 deactivationTime;
        bool isActive;
    }
    struct Claim {
        uint256 amount;
        uint256 requestTime;
        bool approved;
    }
    IERC20 public usdtToken; // USDT token contract 
    IERC20 public bitsiToken;
    IBitsiCapitalReserve public capitalReserve;
    address public compensationFundWallet;
    uint256 public bitsiPrice;
    address public adminAddress;

    mapping(uint256 => uint256) public insuranceDurations;
    mapping(address => mapping(uint256 => Policy)) public policies; // User address => token id => Policy
    mapping(address => uint256) public userCredit;
    mapping(address => uint256) public lockedFunds; // Tracks locked funds in capitalReserveWallet
    mapping(address => Claim) public claims;

    uint256 public GROWTH_RATE = 0; // Percent
    uint256 public HIGH_COMPENSATION_LIMIT = 100; // Percent
    uint256 public LOW_COMPENSATION_LIMIT = 50; // Percent
    uint256 public COMPENSATION_PERCENTAGE = 80; // Percent
    uint256 public ACTIVATE_COMMISSION_FEES = 1; // Percent
    uint256 public EXTEND_COMMISSION_FEES = 1; // Percent
    uint256 public UPGRADE_COMMISSION_FEES = 1; // Percent
    uint256 public COMPENSATION_COMMISSION_FEES = 1; // Percent
    uint256 public FEES_REQUEST_TIME = 24 hours; // Fees payment period
    uint256 public AUTO_APPROVAL_TIME = 30 days;
    uint256 public POLICY_RETENTION_PERIOD = 180 days;

    bool private locked;

    event PolicyPending(address indexed user, uint256 policyId);
    event PolicyActivated(address indexed user, uint256 policyId);
    event PolicyDeactivated(address indexed user, uint256 policyId, uint256 deactivationTime);
    event PolicyRemovedFromHistory(address indexed user, uint256 policyId);
    event UpdateBitsiSalePolicy(address indexed user, uint256 policyId, uint256 bitsiAmount);
    event PolicyExtended(address indexed user, uint256 policyId, uint256 expirationDate);
    event PolicyUpgraded(address indexed user, uint256 policyId, uint256 bitsiPrice, uint256 newExpirationDate);
    event BitsiPriceUpdated(uint256 newPrice);
    event adminAddressChanged(address newAdmin);
    event CreditUpdatedBuy(address indexed user, uint256 amount, bool increased);
    event CreditUpdatedSale(address indexed user, uint256 amount, bool increased);
    event UserCompensatitonWhitelisted(address indexed user);
    event CompensationApplied(address indexed user, uint256 amount);
    event CompensationApproved(address indexed user, uint256 amount);
    event CompensationRejected(address indexed user);
    event UserRemovedFromWhitelist(address indexed user);
    event CompensationWithdrawn(address indexed user, uint256 payout);

    // MODIFIERS
    modifier onlyPolicyWhitelisted() {
        require(isPolicyWhitelisted(msg.sender), "User not policy whitelisted");
        _;
    }
    modifier onlyCompensationWhitelisted() {
        require(isCompensationWhitelisted(msg.sender), "User not whitelisted for compensation");
        _;
    }
    modifier nonReentrant() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }
    modifier onlyAdmin() {
        require(msg.sender == adminAddress, "Not authorized");
        _;
    }
    // SET BITSI PRICE FROM BACKEND
    function updateBitsiPrice(
        uint256 newPrice) external onlyAdmin {
        require(newPrice > 0, "Invalid BITSI price");
        bitsiPrice = newPrice;
        emit BitsiPriceUpdated(newPrice); // Log the change
    }
    // MANAGE USER CREDIT
    function updateCreditBuy(
        address user, uint256 amount) external onlyAdmin {
        require(amount > 0, "Invalid credit amount");
        userCredit[user] += amount;
        emit CreditUpdatedBuy(user, amount, true);
    } //-> when user buys Bitsi
    function updateCreditSell(
        address user, uint256 amount) external onlyAdmin {
        require(amount > 0, "Invalid credit amount");
        userCredit[user] = userCredit[user] > amount ? userCredit[user] - amount : 0;
        emit CreditUpdatedSale(user, amount, true);
    } //-> when user sells Bitsi
    // ADMIN MANAGEMENT
    function setadminAddress(
        address newAdmin) external onlyOwner {
        require(newAdmin != address(0), "Invalid address");
        adminAddress = newAdmin;
        emit adminAddressChanged(newAdmin); // ✅ Logs the change
    }
    function getAdmin() external view returns (address) {
        return adminAddress;
    }  
    // USER CALLLED FUNCTIONS
    function activatePolicy(uint256 policyId, uint256 INSURANCE_PERIOD, address currency,uint256 bitsiAmount) external nonReentrant onlyPolicyWhitelisted{
        
        require(bitsiAmount > 0, "Invalid BITSI amount");
        uint256 insurancePremium = bitsiPrice * bitsiAmount;

        require(capitalReserve.getUSDTBalance() >= insurancePremium, "Not enough USDT in reserve");

        // Lock USDT amount in capital reserve
        capitalReserve.lockFunds(msg.sender, insurancePremium, true);
        
        // Ensure the contract has enough allowance before proceeding
        uint256 fees = (insurancePremium * ACTIVATE_COMMISSION_FEES) / 100;
        require(usdtToken.allowance(msg.sender, address(this)) >= fees, "USDT allowance too low, approve contract first");
        require(usdtToken.transferFrom(msg.sender, compensationFundWallet, fees), "Commission fees not paid");
          
        policies[msg.sender][policyId].bitsiAmount = bitsiAmount;
        policies[msg.sender][policyId].bitsiPrice = bitsiPrice;     
        policies[msg.sender][policyId].currency = currency;
        policies[msg.sender][policyId].insurancePremium = bitsiPrice * bitsiAmount;
        policies[msg.sender][policyId].startDate = block.timestamp;
        policies[msg.sender][policyId].expirationDate = block.timestamp + insuranceDurations[INSURANCE_PERIOD];
        policies[msg.sender][policyId].claimTime = policies[msg.sender][policyId].expirationDate;
        policies[msg.sender][policyId].INSURANCE_PERIOD = INSURANCE_PERIOD;
        policies[msg.sender][policyId].compensation = 0;
        policies[msg.sender][policyId].deactivationTime = 0;
        policies[msg.sender][policyId].isActive = false;

        emit PolicyPending(msg.sender, policyId);
    }
    function extendPolicy(uint256 policyId) external onlyPolicyWhitelisted {
        Policy storage policy = policies[msg.sender][policyId];

        require(policy.isActive, "Policy is not active");
        require(policy.expirationDate > 0, "Invalid policy ID");

       // Require upgrade commission fees
        uint256 fees = (policy.insurancePremium * EXTEND_COMMISSION_FEES) / 100;
        require(usdtToken.allowance(msg.sender, address(this)) >= fees, "USDT allowance too low, approve contract first");
        bool success = usdtToken.transferFrom(msg.sender, compensationFundWallet, fees);
        require(success, "USDT transfer failed");

        // Extend expiration by 1 year from the current expiration date
        policy.expirationDate += 365 days;

        // Emit event to confirm extension
        emit PolicyExtended(msg.sender, policyId, policy.expirationDate);
    }
    function upgradePolicy(uint256 policyId) external onlyPolicyWhitelisted {
        Policy storage policy = policies[msg.sender][policyId];

        // Ensure policy is active
        require(policy.isActive, "No active policy");

        // Ensure valid new price
        require(bitsiPrice > policy.bitsiPrice, "New price must be greater than zero");

        // User have enough credit
        uint256 upgradeAmount = (bitsiPrice-policy.bitsiPrice)*policy.bitsiAmount;
        require(userCredit[msg.sender]>upgradeAmount, "Not enough credit to upgrade the policy"); 

        // Require upgrade commission fees
        uint256 fees = (upgradeAmount * UPGRADE_COMMISSION_FEES) / 100;
        require(usdtToken.allowance(msg.sender, address(this)) >= fees, "USDT allowance too low, approve contract first");
        require(usdtToken.transferFrom(msg.sender, compensationFundWallet, fees), "Commission fees not paid");
 
        // Update the BITSI price
        policy.bitsiPrice = bitsiPrice;

        // Update premium
        policy.insurancePremium += upgradeAmount;

        // Shift expiration based on the original insurance period, starting from now
        policy.expirationDate = block.timestamp + insuranceDurations[policy.INSURANCE_PERIOD];

        // Update start date to reflect upgrade time
        policy.startDate = block.timestamp;

        // Emit event to track policy upgrade
        emit PolicyUpgraded(msg.sender, policyId, bitsiPrice, policy.expirationDate);
    }
    function computeCompensation(uint256 bitsiSold, uint256 policyBitsiPrice) 
        internal view returns (uint256 compensationPaidBitsi, uint256 commissionFeesUsdt) {
        /* compensation is not agaisnt a sale price at which user sold his Bitsi but agains current
        Bitsi price */
        uint256 loss = 0;

        // ✅ Calculate threshold prices
        uint256 lowThresholdPrice = (LOW_COMPENSATION_LIMIT * policyBitsiPrice) / 100;
        uint256 highThresholdPrice = (HIGH_COMPENSATION_LIMIT * policyBitsiPrice) / 100;

        // ✅ Compute loss per BITSI sold
        if (bitsiPrice >= highThresholdPrice) {
            loss = 0; // No loss if sold above high limit
        } else if (bitsiPrice < lowThresholdPrice) {
            loss = policyBitsiPrice - lowThresholdPrice; // Cap loss if below low threshold
        } else {
            loss = policyBitsiPrice - bitsiPrice; // Normal loss calculation
        }

        // ✅ Compute total compensation for `bitsiSold`
        uint256 totalCompensation = loss * bitsiSold / bitsiPrice;

        // ✅ Apply the percentage of compensation that is paid
        compensationPaidBitsi = (totalCompensation / bitsiPrice * COMPENSATION_PERCENTAGE) / 100; // In Bitsi

        // ✅ Deduct commission fees from the total compensation
        commissionFeesUsdt = (totalCompensation * COMPENSATION_COMMISSION_FEES) / 100; // In USDT

        // ✅ Ensure values are positive before returning
        return (compensationPaidBitsi, commissionFeesUsdt);
    }
    function applyForCompensation(uint256 amount) external onlyPolicyWhitelisted {
        require(amount > 0, "Invalid amount");
        require(!isCompensationWhitelisted(msg.sender), "Already applied");
        
        claims[msg.sender] = Claim({
            amount: amount,
            requestTime: block.timestamp,
            approved: false
        });
        
        addCompensationWhitelist(msg.sender);
        emit UserCompensatitonWhitelisted(msg.sender);
        emit CompensationApplied(msg.sender, amount);
    }
    function withdrawCompensation() external onlyPolicyWhitelisted onlyCompensationWhitelisted {
        // Auto-approve if 30 days have passed and claim is still pending
        if (!claims[msg.sender].approved && block.timestamp >= claims[msg.sender].requestTime + AUTO_APPROVAL_TIME) {
            claims[msg.sender].approved = true;
            emit CompensationApproved(msg.sender, claims[msg.sender].amount);
        }

        require(claims[msg.sender].approved, "Compensation not approved");
        require(claims[msg.sender].amount > 0, "No compensation available");

        uint256 payout = claims[msg.sender].amount;
        capitalReserve.withdrawCompensation(msg.sender, payout);

        delete claims[msg.sender];

        removePolicyWhitelist(msg.sender);
        emit UserRemovedFromWhitelist(msg.sender);
        emit CompensationWithdrawn(msg.sender, payout);
    }
    function getCompensationStatus() external view returns (string memory) {
        if (claims[msg.sender].requestTime == 0 && claims[msg.sender].amount == 0) {
            return "No compensation request";
        } else if (!claims[msg.sender].approved) {
            return "Compensation pending approval";
        } else {
            return "Compensation approved and available for withdrawal";
        }
    }
    // ADMIN:POLICY:SUPPORT FUNCTIONS
    function approvePolicy(address user, uint256 policyId) external onlyOwner {
        require(policies[user][policyId].bitsiAmount > 0, "Policy does not exist");

        Policy storage policy = policies[user][policyId];

        require(!policy.isActive, "Policy already active"); //

        policy.isActive = true;
        addPolicyWhitelist(user); // ✅ Corrected the function call

        emit PolicyActivated(user, policyId);
    }
    function updatePolicyWhitelist(address[] calldata users,uint256[] calldata policyIds) external onlyOwner nonReentrant {
        require(users.length == policyIds.length, "Mismatched input arrays");

        for (uint256 i = 0; i < users.length; i++) {
            require(policies[users[i]][policyIds[i]].bitsiAmount > 0, "Policy does not exist");
            Policy storage policy = policies[users[i]][policyIds[i]];

            require(policy.isActive, "Policy already inactive");

            // ✅ Mark policy as inactive instead of deleting it
            policy.isActive = false;
            policy.deactivationTime = block.timestamp;

            removePolicyWhitelist(users[i]); // ✅ Remove user from whitelist

            require(
                capitalReserve.getLockedFunds(users[i], true) >= policy.insurancePremium,
                "Insufficient locked funds"
            );
            capitalReserve.unlockUSDT(users[i], policy.insurancePremium);
            
            emit PolicyDeactivated(users[i], policyIds[i], block.timestamp); // ✅ Improved event
        }
    }
    function removeExpiredPolicies(address user, uint256 policyId) external onlyOwner {
        Policy storage policy = policies[user][policyId];
        require(!policy.isActive, "Policy is still active");
        require(block.timestamp >= policy.deactivationTime + POLICY_RETENTION_PERIOD, "Policy retention period not met");
        
        delete policies[user][policyId];
        emit PolicyRemovedFromHistory(user, policyId);
    } 
    // ADMIN:COMPENSATION:SUPPORT FUNCTIONS   
    function approveCompensation(address user, uint256 policyId) external onlyOwner {
        require(isCompensationWhitelisted(user), "User not whitelisted for compensation");
        require(!claims[user].approved, "Already approved");

        Policy storage policy = policies[user][policyId];

        claims[user].approved = true;

        capitalReserve.unlockUSDTAndLockBITSI(user, policy.insurancePremium, policy.bitsiAmount);

        emit CompensationApproved(user, claims[user].amount);
    }
    function rejectCompensation(address user) external onlyOwner {
        require(isCompensationWhitelisted(user), "User not whitelisted for compensation");
        
        delete claims[user];

        removeCompensationWhitelist(user);

        emit UserRemovedFromWhitelist(user);
        emit CompensationRejected(user);
    }
    function UpdateBitsiCovered(
        address[] calldata users, 
        uint256[] calldata policyIds, 
        uint256[] calldata amountsSold) external onlyOwner {
        uint256 len = users.length;

        // ✅ Ensure all input arrays have the same length
        require(
            len == policyIds.length && len == amountsSold.length, 
            "Array length mismatch"
        );

        // ✅ Process all policy updates in a single loop for efficiency
        for (uint256 i = 0; i < len; ) {
            address user = users[i];
            uint256 policyId = policyIds[i];
            uint256 amountSold = amountsSold[i];

            // ✅ Ensure policy is active
            require(policies[user][policyId].isActive, "No active policy");

            // ✅ Ensure amountSold is greater than zero
            require(amountSold > 0, "Invalid amount sold");

            // ✅ Ensure user has enough BITSI insured
            require(policies[user][policyId].bitsiAmount >= amountSold, "Insufficient covered BITSI");

            // ✅ Deduct the sold BITSI amount
            policies[user][policyId].bitsiAmount -= amountSold;

            // ✅ Recalculate insurance premium based on remaining BITSI
            policies[user][policyId].insurancePremium = policies[user][policyId].bitsiAmount * policies[user][policyId].bitsiPrice;

            // ✅ Mark policy as inactive if no BITSI remains
            if (policies[user][policyId].bitsiAmount == 0) {
                policies[user][policyId].isActive = false;
                policies[user][policyId].insurancePremium = 0;
            }

            // ✅ Emit event for each policy update
            emit UpdateBitsiSalePolicy(user, policyId, policies[user][policyId].bitsiAmount);

            // ✅ Optimize gas: Use `unchecked` to avoid SafeMath overhead
            unchecked { i++; }
        }
    }   
}
