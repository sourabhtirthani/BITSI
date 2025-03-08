  pragma solidity 0.8.25;

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


  contract Whitelist is Ownable  {

  mapping (address => bool) private whitelistedMap;

  event Whitelisted(address indexed account, bool isWhitelisted);

  function whitelisted(address _address)
    public
    view
    returns (bool)
  {
    
    return whitelistedMap[_address];
  }

  function addAddress(address  _address)
    public
    onlyOwner
  {
    require(whitelistedMap[_address] != true);
    whitelistedMap[_address] = true;
    emit Whitelisted(_address, true);
  }

  function removeAddress(address _address)
    public
    onlyOwner
  {
    require(whitelistedMap[_address] != false);
    whitelistedMap[_address] = false;
    emit Whitelisted(_address, false);
  }
}


  contract CoinInsurance is Whitelist {
      struct Policy {
          uint256 startTime;
          uint256 endTime;
          uint256 claimTime;
          uint256 INSURANCE_PERIOD;
          bool active;
          bool approved;
          uint256 compensation;
          address compensationOwner;
          bool isExtended;
          bool isUpgraded;
          address currency;
          uint256 bitsiCoverage;
          uint256 bitsiPrice;
          uint256 insuredValue;
          uint256 insurancePremium;
      }

      uint256 public GROWTH_RATE = 0; // Percent
      uint256 public HIGH_COMPENSATION_LIMIT = 100; // Percent
      uint256 public LOW_COMPENSATION_LIMIT = 50; // Percent
      uint256 public COMPENSATION_PERCENTAGE = 80; // Percent
      uint256 public ACTIVATE_COMMISSION_FEES = 1; // Percent
      uint256 public EXTEND_COMMISSION_FEES = 1; // Percent
      uint256 public UPGRADE_COMMISSION_FEES = 1; // Percent
      uint256 public FEES_REQUEST_TIME = 24 hours; // Fees payment period

      IERC20 public bitsiToken;
      IERC20 public USDT;
      address public compensationFundWallet;

      mapping(address => mapping(uint256 => Policy)) public policies; // User address => token id => Policy
      mapping(address => mapping(uint256 => uint256)) public coinPrices; // User address => token id => price
      mapping (uint256=> uint256) public coinClaimTime;
      mapping(address => uint256) public userCredit;
      event PolicyActivated(address indexed user, uint256 indexed tokenId, uint256 coverage, uint256 startTime, uint256 endTime);
      event ClaimSubmitted(address indexed user, uint256 indexed tokenId, uint256 compensation, bool extended);
      event CompensationPaid(address indexed user, uint256 indexed tokenId, uint256 compensation);
      event CompensationApproved(address indexed user, uint256 indexed tokenId, uint256 compensation);
      event ParametersUpdated(uint256 newCompensationPercentage,  uint256 newHighLimit, uint256 newLowLimit, uint256 newFees);
      event PolicyUpgraded(address indexed user, uint256 indexed tokenId, uint256 newCoverage);
      event PolicyExtended(address indexed user,uint256 indexed coinId, uint256 indexed newTime);
      event BitsiCoveredUpdated(address indexed user, uint256 indexed coinId, uint256 newBitsiCovered);
      event PayInsurancePremium(address to,uint256 amount);

      constructor(address _bitsiToken,address _USDT, address _compensationFundWallet)  {
          bitsiToken = IERC20(_bitsiToken);
          USDT = IERC20(_USDT);
          compensationFundWallet = _compensationFundWallet;
      }

      function activatePolicy(address user, uint256 coinId, uint256 bitsiPrice,uint256 INSURANCE_PERIOD, address currency ,uint256 bitsiCovered) external {
          require(whitelisted(msg.sender),"User is not whitelisted by Onwer");
          require(policies[user][coinId].active == false, "Policy already exists");
          require(bitsiPrice > 0, "Invalid BITSI price");
          require(bitsiCovered > 0, "Invalid BITSI amount");
          uint256 insurancePremium = bitsiPrice * bitsiCovered;
          uint256 endTime;
          if(INSURANCE_PERIOD==1) endTime = block.timestamp + 365 days ;
          else if(INSURANCE_PERIOD==3) endTime = block.timestamp + 1095 days;
          else if (INSURANCE_PERIOD==5) endTime = block.timestamp + 1825 days;
          else revert("Invalid INSURANCE PERIOD");
          
          uint256 fees = (bitsiPrice * ACTIVATE_COMMISSION_FEES) / 100;
          require(bitsiToken.transferFrom(user, compensationFundWallet, fees), "Commission fees not paid");
          uint256 startTime = block.timestamp;
          uint256 insuredValue=bitsiPrice*bitsiCovered;

          policies[user][coinId] = Policy({
              bitsiPrice: bitsiPrice,
              startTime: startTime,
              endTime: endTime,
              claimTime:endTime,
              INSURANCE_PERIOD:INSURANCE_PERIOD,
              active: true,
              approved: false,
              compensation: 0,
              compensationOwner: user,
              isExtended: false,
              isUpgraded: false,
              currency:currency,
              bitsiCoverage: bitsiCovered,
              insuredValue:insuredValue,
              insurancePremium:insurancePremium
          });

          coinPrices[user][coinId] = bitsiPrice;

          emit PolicyActivated(user, coinId, bitsiPrice, startTime, endTime);
      }
      // Function to update bitsiCovered when coins are transferred
      function updateBitsiCovered(address user, uint256 coinId, uint256 amountSold, uint256 reportedSalePrice) external onlyOwner 
      {
         
      require(policies[user][coinId].active, "No active policy");
      require(policies[user][coinId].bitsiCoverage >= amountSold, "Insufficient covered BITSI");

      policies[user][coinId].bitsiCoverage -= amountSold;
      policies[user][coinId].insuredValue -=reportedSalePrice*amountSold;
      // Mark policy as inactive if bitsiCovered becomes zero or negative
      if (policies[user][coinId].bitsiCoverage <= 0) {
          policies[user][coinId].active = false;
          policies[user][coinId].bitsiCoverage = 0; // Ensure it does not go negative
      }

      emit BitsiCoveredUpdated(user, coinId, policies[user][coinId].bitsiCoverage);
    }
      // Function to compute loss and compensation when user claims compensation
      function computeCompensation(address user, uint256 coinId, uint256 bitsiSold, uint256 reportedSalePrice) internal returns (uint256 loss, uint256 compensation) {
        
          require(policies[user][coinId].bitsiCoverage >= bitsiSold, "Insufficient covered BITSI for sale");
          
          uint256 initialPrice = policies[user][coinId].bitsiPrice;
          require(initialPrice > 0, "Invalid initial BITSI price");
          require(reportedSalePrice > 0, "Invalid reported BITSI sale price");
          
          // Compute per BITSI loss
          loss = initialPrice > reportedSalePrice ? (initialPrice - reportedSalePrice) : 0;
          
          // Ensure loss does not exceed max compensation limit per BITSI
          uint256 maxCompensableLoss = (COMPENSATION_PERCENTAGE * initialPrice) / 100;
          if (loss > maxCompensableLoss) {
              loss = maxCompensableLoss;
          }
          
          // Multiply by sold BITSI to get total compensation
          compensation = loss * bitsiSold/reportedSalePrice;
          
          // Deduct compensation fees
          uint256 compensationFees = (compensation * COMPENSATION_PERCENTAGE) / 100;
          require(bitsiToken.transferFrom(user, compensationFundWallet, compensationFees), "Compensation fees payment failed");
          
          return (loss, compensation);
      }
      function claim(address user, uint256 coinId, uint256 salePrice, uint256 bitsiSold) external {
          Policy storage policy = policies[user][coinId];
          require(policy.active, "No active policy");
          require(policy.approved, "Policy not approved yet");
          require(msg.sender == policy.compensationOwner, "Unauthorized claim");

          (uint256 loss, uint256 compensation)= computeCompensation(user,coinId,bitsiSold,salePrice);
         
          policy.compensation = compensation;
          if(policy.INSURANCE_PERIOD==1) policy.claimTime= block.timestamp+ 30 days;
          else if(policy.INSURANCE_PERIOD==3) policy.claimTime= block.timestamp+ 90 days;
          else if(policy.INSURANCE_PERIOD==5) policy.claimTime= block.timestamp+ 150 days;

          _payCompensation(user, coinId, compensation,policy.currency,policy.claimTime);
          
          emit ClaimSubmitted(user, coinId, compensation, policy.isExtended);
      }

      function approveCompensation(address user, uint256 coinId, uint256 compensation) external onlyOwner {
          Policy storage policy = policies[user][coinId];
          require(policy.active, "No active policy");
          policy.approved = true;
          policy.compensation = compensation;
          emit CompensationApproved(user, coinId, compensation);
      }

      function _payCompensation(address user, uint256 tokenId, uint256 compensation,address currency,uint256 unlockTime) internal {
          Policy storage policy = policies[user][tokenId];

          require(IERC20(currency).transferFrom(compensationFundWallet, user, compensation), "Compensation payment failed");

          IERC20(currency).updateCustomData( user, compensation,unlockTime);

          emit CompensationPaid(user, tokenId, compensation);
      }

      function extendPolicy(address user, uint256 coinId) external {
          require(whitelisted(msg.sender),"User is not whitelisted by Onwer");
          Policy storage policy = policies[user][coinId];
          require(policy.active, "No active policy");
          require(!policy.isExtended, "Already extended");

          uint256 fees = (coinPrices[user][coinId] * EXTEND_COMMISSION_FEES) / 100;
          require(bitsiToken.transferFrom(user, compensationFundWallet, fees), "Extension fees not paid");
          policy.isExtended = true;
          policy.endTime += 365 days;

          // Require extension commission fees
         
          emit PolicyExtended(user, coinId, policies[user][coinId].endTime);

      }

     function upgradePolicy(address user, uint256 policyId, uint256 newPrice, uint256 upgradeAmount) external {
			require(whitelisted(msg.sender),"User is not whitelisted by Onwer");

                        Policy storage policy = policies[user][policyId];

			require(policy.active, "No active policy");
			require(newPrice > 0, "New price must be greater than zero");

			// Require upgrade commission fees
			uint256 fees = (upgradeAmount * UPGRADE_COMMISSION_FEES) / 100;
			require(bitsiToken.transferFrom(user, compensationFundWallet, fees), "Upgrade fees not paid");

			// Update insured value by adding the upgrade amount
			policy.insuredValue += upgradeAmount;

			// Set the new BITSI price at upgrade time
			policy.bitsiPrice = newPrice;

			// Compute new end time based on elapsed time since activation
			policy.endTime += block.timestamp - policy.startTime;
			policy.startTime = block.timestamp;

			// Mark policy as upgraded
			policy.isUpgraded = true;

			emit PolicyUpgraded(user, policyId, policy.bitsiCoverage);
		  }
      function updateParameters(uint256 _compensationPercentage, uint256 _highLimit, uint256 _lowLimit, uint256 _fees) external onlyOwner {
          COMPENSATION_PERCENTAGE = _compensationPercentage;
          HIGH_COMPENSATION_LIMIT = _highLimit;
          LOW_COMPENSATION_LIMIT = _lowLimit;
          ACTIVATE_COMMISSION_FEES = _fees;

          emit ParametersUpdated(_compensationPercentage, _highLimit, _lowLimit, _fees);
      }

      function payInsurancePremium( address user,uint256 coinId) external  onlyOwner{
        Policy storage policy = policies[user][coinId];
			  require(policy.active, "No active policy");
        require(policy.insurancePremium>0,"Insufficient premium");
        require(USDT.transferFrom(owner(),msg.sender,policy.insurancePremium),"Failed to pay fee in USDT");
        emit PayInsurancePremium(user,policy.insurancePremium);
        policy.insurancePremium=0;
      }

  }
