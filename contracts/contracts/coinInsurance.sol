  // SPDX-License-Identifier: MIT
  pragma solidity 0.8.28;

  interface IERC20 {
      function transferFrom(address from, address to, uint256 amount) external returns (bool);
      function balanceOf(address account) external view returns (uint256);
      function updateCustomData(address user, uint256 tokens,uint256 unBlockingTime) external ;
  }


  /*
  * @dev Provides information about the current execution context, including the
  * sender of the transaction and its data. While these are generally available
  * via msg.sender and msg.data, they should not be accessed in such a direct
  * manner, since when dealing with GSN meta-transactions the account sending and
  * paying for execution may not be the actual sender (as far as an application
  * is concerned).
  *
  * This contract is only required for intermediate, library-like contracts.
  */
  contract Context {
    // Empty internal constructor, to prevent people from mistakenly deploying
    // an instance of this contract, which should be used via inheritance.
    constructor ()  { }

    function _msgSender() internal view returns (address payable) {
      return payable(msg.sender);
    }

    function _msgData() internal view returns (bytes memory) {
      this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
      return msg.data;
    }
  }

  /**
  * @dev Contract module which provides a basic access control mechanism, where
  * there is an account (an owner) that can be granted exclusive access to
  * specific functions.
  *
  * By default, the owner account will be the one that deploys the contract. This
  * can later be changed with {transferOwnership}.
  *
  * This module is used through inheritance. It will make available the modifier
  * `onlyOwner`, which can be applied to your functions to restrict their use to
  * the owner.
  */
  contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
    * @dev Initializes the contract setting the deployer as the initial owner.
    */
    constructor ()  {
      address msgSender = _msgSender();
      _owner = msgSender;
      emit OwnershipTransferred(address(0), msgSender);
    }

    /**
    * @dev Returns the address of the current owner.
    */
    function owner() public view returns (address) {
      return _owner;
    }

    /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
      require(_owner == _msgSender(), "Ownable: caller is not the owner");
      _;
    }

    /**
    * @dev Leaves the contract without owner. It will not be possible to call
    * `onlyOwner` functions anymore. Can only be called by the current owner.
    *
    * NOTE: Renouncing ownership will leave the contract without an owner,
    * thereby removing any functionality that is only available to the owner.
    */
    function renounceOwnership() public onlyOwner {
      emit OwnershipTransferred(_owner, address(0));
      _owner = address(0);
    }

    /**
    * @dev Transfers ownership of the contract to a new account (`newOwner`).
    * Can only be called by the current owner.
    */
    function transferOwnership(address newOwner) public onlyOwner {
      _transferOwnership(newOwner);
    }

    /**
    * @dev Transfers ownership of the contract to a new account (`newOwner`).
    */
    function _transferOwnership(address newOwner) internal {
      require(newOwner != address(0), "Ownable: new owner is the zero address");
      emit OwnershipTransferred(_owner, newOwner);
      _owner = newOwner;
    }
  }

  contract CoinInsurance is Ownable {
      struct Policy {
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

      uint256 public GROWTH_RATE = 0; // Percent
      uint256 public HIGH_COMPENSATION_LIMIT = 100; // Percent
      uint256 public LOW_COMPENSATION_LIMIT = 50; // Percent
      uint256 public COMPENSATION_PERCENTAGE = 80; // Percent
      uint256 public ACTIVATE_COMMISSION_FEES = 1; // Percent
      uint256 public EXTEND_COMMISSION_FEES = 1; // Percent
      uint256 public UPGRADE_COMMISSION_FEES = 1; // Percent     
      uint256 public COMPENSATION_COMMISSION_FEES = 1; // Percent
      uint256 public FEES_REQUEST_TIME = 24 hours; // Fees payment period
  
      IERC20 public bitsiToken;
      address public compensationFundWallet;
      
      mapping(uint256 => uint256) public insuranceDurations;
      mapping(address => mapping(uint256 => Policy)) public policies; // User address => token id => Policy
      mapping (uint256=> uint256) public coinClaimTime;

      event PolicyActivated(address indexed user, uint256 indexed policyId, uint256 coverage, uint256 startDate, uint256 expirationDate);
      event ClaimSubmitted(address indexed user, uint256 indexed policyId, uint256 totalCompensation);
      event CompensationProcessed(address indexed user, uint256 indexed policyId, uint256 compensationAmount);
      event CompensationPaid(address indexed user, uint256 indexed policyId, uint256 compensation);
      event CompensationApproved(address indexed user, uint256 indexed policyId, uint256 compensation);
      event PolicyUpgraded(address indexed user, uint256 indexed policyId, uint256 coverage, uint256 startDate, uint256 expirationDate);
      event PolicyExtended(address indexed user,uint256 indexed policyId, uint256 indexed newTime);
      event BitsiCoveredUpdated(address indexed user, uint256 indexed policyId, uint256 newBitsiCovered);
      event PolicyDeactivated(address indexed user, uint256 indexed policyId);
      event PolicyDeleted(address indexed user, uint256 indexed policyId);
      event ParametersUpdated(
        uint256 newGrowthRate, 
        uint256 newCompensationPercentage, 
        uint256 newHighLimit, 
        uint256 newLowLimit, 
        uint256 newActivateFees, 
        uint256 newExtendFees, 
        uint256 newUpgradeFees, 
        uint256 newFeeRequestTime);


      constructor(
          address _bitsiToken, 
          address _compensationFundWallet,
          uint256[] memory contractDurationsInYears // Pass years
      ) {
          // Initialize token and wallet
          bitsiToken = IERC20(_bitsiToken);
          compensationFundWallet = _compensationFundWallet;
          // Convert years into seconds and store in mapping
          for (uint256 i = 0; i < contractDurationsInYears.length; i++) {
              insuranceDurations[contractDurationsInYears[i]] = contractDurationsInYears[i] * 365 days;
          }
      }

    function activatePolicy(
    address user, 
    uint256 policyId, 
    uint256 bitsiPrice,
    uint256 INSURANCE_PERIOD, 
    address currency,
    uint256 bitsiAmount) external onlyOwner {

    require(policies[user][policyId].isActive == false, "Policy already exists");
    require(bitsiPrice > 0, "Invalid BITSI price");
    require(insuranceDurations[INSURANCE_PERIOD] > 0, "Invalid INSURANCE PERIOD");

    uint256 fees = (bitsiPrice * ACTIVATE_COMMISSION_FEES) / 100;
    require(bitsiToken.transferFrom(user, compensationFundWallet, fees), "Commission fees not paid");

    uint256 startDate = block.timestamp;
    uint256 expirationDate = block.timestamp + insuranceDurations[INSURANCE_PERIOD];

    policies[user][policyId] = Policy({
        userId: user,
        bitsiAmount: bitsiAmount,
        bitsiPrice: bitsiPrice,
        currency: currency,
        insurancePremium: bitsiPrice * bitsiAmount,
        startDate: startDate,
        expirationDate: expirationDate,
        claimTime: expirationDate,
        INSURANCE_PERIOD: INSURANCE_PERIOD,
        compensation: 0,
        deactivationTime: 0,
        isActive: true
    });

    emit PolicyActivated(user, policyId, bitsiPrice, startDate, expirationDate);
    }


    function batchActivatePolicies(
        address[] calldata users, 
        uint256[] calldata policyIds, 
        uint256 bitsiPrice,  
        uint256[] calldata insurancePeriods, 
        address[] calldata currencies, 
        uint256[] calldata bitsiAmounts) external onlyOwner {
        uint256 len = users.length;

        // ✅ Ensure all input arrays have the same length
        require(
            len == policyIds.length &&
            len == insurancePeriods.length &&
            len == currencies.length &&
            len == bitsiAmounts.length, 
            "Array length mismatch"
        );

        require(bitsiPrice > 0, "Invalid BITSI price");

        // ✅ Process all policies in a single loop for efficiency
        for (uint256 i; i < len; ) {
            Policy storage policy = policies[users[i]][policyIds[i]];

            require(!policy.isActive, "Policy already exists");
            require(bitsiAmounts[i] > 0, "Bitsi amount must be greater than zero");
            require(insuranceDurations[insurancePeriods[i]] > 0, "Invalid INSURANCE PERIOD");

            // ✅ Assign values directly to storage to reduce stack usage
            policy.userId = users[i];
            policy.bitsiAmount = bitsiAmounts[i];
            policy.bitsiPrice = bitsiPrice;
            policy.currency = currencies[i];
            policy.insurancePremium = bitsiPrice * bitsiAmounts[i];
            policy.startDate = block.timestamp;
            policy.expirationDate = block.timestamp + insuranceDurations[insurancePeriods[i]];
            policy.claimTime = policy.expirationDate;
            policy.INSURANCE_PERIOD = insurancePeriods[i];
            policy.compensation = 0;
            policy.deactivationTime = 0;
            policy.isActive = true;

            // ✅ Emit event for each policy activation
            emit PolicyActivated(users[i], policyIds[i], bitsiPrice, policy.startDate, policy.expirationDate);

            // ✅ Optimize gas: Use `unchecked` to avoid SafeMath overhead
            unchecked { i++; }
        }
    }


    function updateBitsiCovered(
        address user, 
        uint256 policyId, 
        uint256 amountSold) external onlyOwner {
        
        // ✅ Ensure policy is active
        require(policies[user][policyId].isActive, "No active policy");

        // ✅ Ensure amountSold is greater than zero
        require(amountSold > 0, "Invalid amount sold");

        // ✅ Ensure user has enough BITSI insured
        require(policies[user][policyId].bitsiAmount >= amountSold, "Insufficient covered BITSI");

        // ✅ Deduct the sold BITSI amount
        policies[user][policyId].bitsiAmount -= amountSold;

        // ✅ Recalculate insurance premium to prevent incorrect values
        policies[user][policyId].insurancePremium = policies[user][policyId].bitsiAmount * policies[user][policyId].bitsiPrice;

        // ✅ Mark policy as inactive if no BITSI remains
        if (policies[user][policyId].bitsiAmount == 0) {
            policies[user][policyId].isActive = false;
            policies[user][policyId].insurancePremium = 0;
        }

        // ✅ Emit event
        emit BitsiCoveredUpdated(user, policyId, policies[user][policyId].bitsiAmount);
    }

    function batchUpdateBitsiCovered(
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
            emit BitsiCoveredUpdated(user, policyId, policies[user][policyId].bitsiAmount);

            // ✅ Optimize gas: Use `unchecked` to avoid SafeMath overhead
            unchecked { i++; }
        }
    }

      // Function to compute loss and compensation when user claims compensation
    function computeCompensation(
        address user, 
        uint256 policyId, 
        uint256 bitsiSold, 
        uint256 reportedSalePrice) internal view returns (uint256 compensationPaid, uint256 commissionFees) {
        
        // ✅ Ensure valid input
        require(bitsiSold > 0, "No BITSI sold");
        require(policies[user][policyId].bitsiPrice > 0, "Invalid initial BITSI price");
        require(reportedSalePrice > 0, "Invalid reported BITSI sale price");

        // ✅ Get initial purchase price per BITSI
        uint256 initialPrice = policies[user][policyId].bitsiPrice;
        uint256 loss = 0;

        // ✅ Calculate threshold prices
        uint256 lowThresholdPrice = (LOW_COMPENSATION_LIMIT * initialPrice) / 100;
        uint256 highThresholdPrice = (HIGH_COMPENSATION_LIMIT * initialPrice) / 100;

        // ✅ Compute loss per BITSI sold
        if (reportedSalePrice >= highThresholdPrice) {
            loss = 0; // No loss if sold above high limit
        } else if (reportedSalePrice < lowThresholdPrice) {
            loss = initialPrice - lowThresholdPrice; // Cap loss if below low threshold
        } else {
            loss = initialPrice - reportedSalePrice; // Normal loss calculation
        }

        // ✅ Compute total compensation for `bitsiSold`
        uint256 totalCompensation = loss * bitsiSold;

        // ✅ Apply the percentage of compensation that is paid
        compensationPaid = (totalCompensation * COMPENSATION_PERCENTAGE) / 100;

        // ✅ Deduct commission fees from the total compensation
        commissionFees = (totalCompensation * COMPENSATION_COMMISSION_FEES) / 100;

        // ✅ Ensure values are positive before returning
        return (compensationPaid, commissionFees);
    }

    // Function is called upon user request when user initiate compensation claim
    function claim(
    address user, 
    uint256 policyId, 
    uint256 salePrice, 
    uint256 bitsiSold) external onlyOwner {
    Policy storage policy = policies[user][policyId];

    // ✅ Ensure policy is active
    require(policy.isActive, "No active policy");

    // ✅ Prevent duplicate claims before the waiting period ends
    require(block.timestamp >= policy.claimTime, "Claim already pending");

    // ✅ Compute compensation (without approving it)
    (uint256 totalCompensation, ) = computeCompensation(user, policyId, bitsiSold, salePrice);
    
    // ✅ Ensure compensation is valid
    require(totalCompensation > 0, "No compensation due");

    // ✅ Store claim request (but set `compensationApproved = false`)
    policy.claimTime = block.timestamp + 30 days;
    policy.compensation = totalCompensation;

    // ✅ Emit event to track claim request
    emit ClaimSubmitted(user, policyId, totalCompensation);
    }

    function batchClaim(
        address[] calldata users, 
        uint256[] calldata policyIds, 
        uint256[] calldata salePrices, 
        uint256[] calldata bitsiSoldAmounts) external onlyOwner {
        uint256 len = users.length;

        // ✅ Ensure input arrays have the same length
        require(
            len == policyIds.length && 
            len == salePrices.length && 
            len == bitsiSoldAmounts.length, 
            "Array length mismatch"
        );

        // ✅ Process all claims in a single loop
        for (uint256 i = 0; i < len; ) {
            address user = users[i];
            uint256 policyId = policyIds[i];
            uint256 salePrice = salePrices[i];
            uint256 bitsiSold = bitsiSoldAmounts[i];

            Policy storage policy = policies[user][policyId];

            // ✅ Ensure policy is active
            require(policy.isActive, "No active policy");

            // ✅ Prevent duplicate claims before the waiting period ends
            require(block.timestamp >= policy.claimTime, "Claim already pending");

            // ✅ Ensure valid inputs
            require(bitsiSold > 0, "Invalid BITSI sold amount");
            require(salePrice > 0, "Invalid sale price");

            // ✅ Compute compensation (without approving it)
            (uint256 totalCompensation, ) = computeCompensation(user, policyId, bitsiSold, salePrice);
            
            // ✅ Ensure compensation is valid
            require(totalCompensation > 0, "No compensation due");

            // ✅ Store claim request (but set `compensationApproved = false`)
            policy.claimTime = block.timestamp + 30 days;
            policy.compensation = totalCompensation;

            // ✅ Emit event for tracking
            emit ClaimSubmitted(user, policyId, totalCompensation);

            // ✅ Optimize gas: Use `unchecked` to avoid SafeMath overhead
            unchecked { i++; }
        }
    }

    function processCompensation(address user, uint256 policyId) external onlyOwner {
        Policy storage policy = policies[user][policyId];

        // ✅ Ensure policy is active
        require(policy.isActive, "No active policy");

        // ✅ Ensure there is a pending compensation to pay
        uint256 compensationAmount = policy.compensation;
        require(compensationAmount > 0, "No pending compensation");

        // ✅ Assign unlockTime based on INSURANCE_PERIOD
        uint256 unlockTime;
        if (policy.INSURANCE_PERIOD == 1) {
            unlockTime = block.timestamp + 30 days;
        } else if (policy.INSURANCE_PERIOD == 3) {
            unlockTime = block.timestamp + 90 days;
        } else if (policy.INSURANCE_PERIOD == 5) {
            unlockTime = block.timestamp + 150 days;
        } else {
            revert("Invalid INSURANCE_PERIOD");
        }

        // ✅ Process the compensation payment
        _payCompensation(user, policyId, compensationAmount, policy.currency, unlockTime);

        // ✅ Reset stored compensation after payout
        policy.compensation = 0;

        // ✅ Emit event to confirm compensation was processed
        emit CompensationProcessed(user, policyId, compensationAmount);
    }

    function batchProcessCompensation(
        address[] calldata users, 
        uint256[] calldata policyIds) external onlyOwner {
        uint256 len = users.length;

        // ✅ Ensure input arrays have the same length
        require(len == policyIds.length, "Array length mismatch");

        // ✅ Process all compensation payments in a single loop
        for (uint256 i = 0; i < len; ) {
            address user = users[i];
            uint256 policyId = policyIds[i];

            Policy storage policy = policies[user][policyId];

            // ✅ Ensure policy is active
            require(policy.isActive, "No active policy");

            // ✅ Ensure there is a pending compensation to pay
            uint256 compensationAmount = policy.compensation;
            require(compensationAmount > 0, "No pending compensation");

            // ✅ Assign unlockTime based on INSURANCE_PERIOD
            uint256 unlockTime;
            if (policy.INSURANCE_PERIOD == 1) {
                unlockTime = block.timestamp + 30 days;
            } else if (policy.INSURANCE_PERIOD == 3) {
                unlockTime = block.timestamp + 90 days;
            } else if (policy.INSURANCE_PERIOD == 5) {
                unlockTime = block.timestamp + 150 days;
            } else {
                revert("Invalid INSURANCE_PERIOD");
            }

            // ✅ Process the compensation payment
            _payCompensation(user, policyId, compensationAmount, policy.currency, unlockTime);

            // ✅ Reset stored compensation after payout
            policy.compensation = 0;

            // ✅ Emit event to confirm compensation was processed
            emit CompensationProcessed(user, policyId, compensationAmount);

            // ✅ Optimize gas: Use `unchecked` to avoid SafeMath overhead
            unchecked { i++; }
        }
    }

    function _payCompensation(
        address user, 
        uint256 policyId, 
        uint256 compensation,
        address currency, 
        uint256 unlockTime) internal {
        Policy storage policy = policies[user][policyId];

        // ✅ Ensure policy is active
        require(policy.isActive, "Policy is not active");

        // ✅ Ensure compensation is valid
        require(compensation > 0, "Invalid compensation amount");

        // ✅ Transfer compensation from fund wallet to user
        require(IERC20(currency).transferFrom(compensationFundWallet, user, compensation), "Compensation payment failed");

        // ✅ Update any custom data (if applicable)
        IERC20(currency).updateCustomData(user, compensation, unlockTime);

        // ✅ Emit compensation paid event
        emit CompensationPaid(user, policyId, compensation);
    }

    function extendPolicy(address user, uint256 policyId) external onlyOwner {
        Policy storage policy = policies[user][policyId];

        // ✅ Ensure policy is active
        require(policy.isActive, "Policy is not active");

        // ✅ Extend expiration by 1 year from the current expiration date
        policy.expirationDate += 365 days;

        // ✅ Emit event to confirm extension
        emit PolicyExtended(user, policyId, policy.expirationDate);
    }

    function batchExtendPolicy(address[] calldata users, uint256[] calldata policyIds) external onlyOwner {
        uint256 len = users.length;

        // ✅ Ensure input arrays have the same length
        require(len == policyIds.length, "Array length mismatch");

        // ✅ Process all policy extensions in a single loop
        for (uint256 i = 0; i < len; ) {
            address user = users[i];
            uint256 policyId = policyIds[i];

            Policy storage policy = policies[user][policyId];

            // ✅ Ensure policy is active
            require(policy.isActive, "Policy is not active");

            // ✅ Extend expiration by 1 year from the current expiration date
            policy.expirationDate += 365 days;

            // ✅ Emit event to confirm extension
            emit PolicyExtended(user, policyId, policy.expirationDate);

            // ✅ Optimize gas: Use `unchecked` to avoid SafeMath overhead
            unchecked { i++; }
        }
    }

    function upgradePolicy(
        address user, 
        uint256 policyId, 
        uint256 newPrice) external onlyOwner {
        Policy storage policy = policies[user][policyId];

        // ✅ Ensure policy is active
        require(policy.isActive, "No active policy");

        // ✅ Ensure valid new price
        require(newPrice > policy.bitsiPrice, "New price must be greater than zero");

        // ✅ Ensure insurance period is valid
        require(insuranceDurations[policy.INSURANCE_PERIOD] > 0, "Invalid INSURANCE_PERIOD");

        uint256 upgradeAmount = (newPrice - policy.bitsiPrice)*policy.bitsiAmount;

        // ✅ Require upgrade commission fees
        uint256 fees = (upgradeAmount * UPGRADE_COMMISSION_FEES) / 100;
        require(bitsiToken.transferFrom(user, compensationFundWallet, fees), "Upgrade fees not paid");

        // ✅ Increase insured value by adding the upgrade amount
        policy.insurancePremium += upgradeAmount;

        // ✅ Update the BITSI price at upgrade time
        policy.bitsiPrice = newPrice;

        // ✅ Shift expiration based on the original insurance period, starting from now
        policy.expirationDate = block.timestamp + insuranceDurations[policy.INSURANCE_PERIOD];

        // ✅ Update start date to reflect upgrade time
        policy.startDate = block.timestamp;

        // ✅ Emit event to track policy upgrade
        emit PolicyUpgraded(user, policyId, policy.bitsiAmount, policy.insurancePremium, policy.expirationDate);
    }

    function batchUpgradePolicy(
        address[] calldata users, 
        uint256[] calldata policyIds, 
        uint256[] calldata newPrices) external onlyOwner {
        uint256 len = users.length;

        // ✅ Ensure input arrays have the same length
        require(
            len == policyIds.length &&
            len == newPrices.length,
            "Array length mismatch"
        );

        // ✅ Process all policy upgrades in a single loop
        for (uint256 i = 0; i < len; ) {
            address user = users[i];
            uint256 policyId = policyIds[i];
            uint256 newPrice = newPrices[i];

            Policy storage policy = policies[user][policyId];

            // ✅ Ensure policy is active
            require(policy.isActive, "No active policy");

            // ✅ Ensure valid new price
            require(newPrice > policy.bitsiPrice, "New price must be greater than zero");

            // ✅ Ensure insurance period is valid
            require(insuranceDurations[policy.INSURANCE_PERIOD] > 0, "Invalid INSURANCE_PERIOD");

            uint256 upgradeAmount = (newPrice - policy.bitsiPrice)*policy.bitsiAmount;


            // ✅ Require upgrade commission fees
            uint256 fees = (upgradeAmount * UPGRADE_COMMISSION_FEES) / 100;
            require(bitsiToken.transferFrom(user, compensationFundWallet, fees), "Upgrade fees not paid");

            // ✅ Increase insured value by adding the upgrade amount
            policy.insurancePremium += upgradeAmount;

            // ✅ Update the BITSI price at upgrade time
            policy.bitsiPrice = newPrice;

            // ✅ Shift expiration based on the original insurance period, starting from now
            policy.expirationDate = block.timestamp + insuranceDurations[policy.INSURANCE_PERIOD];

            // ✅ Update start date to reflect upgrade time
            policy.startDate = block.timestamp;

            // ✅ Emit event to track policy upgrade
            emit PolicyUpgraded(user, policyId, policy.bitsiAmount, policy.insurancePremium, policy.expirationDate);

            // ✅ Optimize gas: Use `unchecked` to avoid SafeMath overhead
            unchecked { i++; }
        }
    }

    function batchDeactivatePolicies(address[] calldata users, uint256[] calldata policyIds) external onlyOwner {
        uint256 len = users.length;
        require(len == policyIds.length, "Array length mismatch");

        for (uint256 i; i < len; ) {
            address user = users[i];
            uint256 policyId = policyIds[i];

            Policy storage policy = policies[user][policyId];

            if (policy.isActive && block.timestamp >= policy.expirationDate) {
                policy.isActive = false;
                policy.deactivationTime = block.timestamp; // ✅ Store deactivation timestamp
                emit PolicyDeactivated(user, policyId);
            }

            unchecked { ++i; } // ✅ Gas-efficient loop increment
        }
    }

    function batchDeleteOldInactivePolicies(address[] calldata users, uint256[] calldata policyIds) external onlyOwner {
        uint256 len = users.length;
        require(len == policyIds.length, "Array length mismatch");

        for (uint256 i; i < len; ) {
            address user = users[i];
            uint256 policyId = policyIds[i];

            Policy storage policy = policies[user][policyId];

            // ✅ Ensure the policy is inactive and was deactivated more than 30 days ago
            if (!policy.isActive && block.timestamp >= policy.deactivationTime + 30 days) {
                delete policies[user][policyId]; // ✅ Delete from storage
                emit PolicyDeleted(user, policyId);
            }

            unchecked { ++i; } // ✅ Gas-efficient loop increment
        }
    }

    function updateParameters(
    uint256  _growthRate, 
    uint256 _compensationPercentage, 
    uint256 _highLimit, 
    uint256 _lowLimit, 
    uint256 _feesActivate,
    uint256 _feesUpgrate,
    uint256 _feesExtend,
    uint256 _requestTime
    ) external onlyOwner {
        GROWTH_RATE = _growthRate;
        COMPENSATION_PERCENTAGE = _compensationPercentage;
        HIGH_COMPENSATION_LIMIT = _highLimit;
        LOW_COMPENSATION_LIMIT = _lowLimit;
        ACTIVATE_COMMISSION_FEES = _feesActivate;
        EXTEND_COMMISSION_FEES = _feesExtend; // Percent
        UPGRADE_COMMISSION_FEES = _feesUpgrate; // Percent
        FEES_REQUEST_TIME = _requestTime; // Fees payment period

        emit ParametersUpdated(
        _growthRate, 
        _compensationPercentage, 
        _highLimit, 
        _lowLimit, 
        _feesActivate,
        _feesExtend,
        _feesUpgrate,
        _requestTime);
    }
}
  
