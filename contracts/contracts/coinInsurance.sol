// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
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
        uint256 coverage;
        uint256 startTime;
        uint256 endTime;
        bool active;
        bool approved;
        uint256 compensation;
        address compensationOwner;
        bool isExtended;
        bool isUpgraded;
    }

    uint256 public INSURANCE_PERIOD = 365 days; // Insurance time period
    uint256 public GROWTH_RATE = 0; // Percent
    uint256 public HIGH_COMPENSATION_LIMIT = 100; // Percent
    uint256 public LOW_COMPENSATION_LIMIT = 50; // Percent
    uint256 public COMPENSATION_PERCENTAGE = 80; // Percent
    uint256 public ACTIVATE_COMMISSION_FEES = 1; // Percent
    uint256 public EXTEND_COMMISSION_FEES = 1; // Percent
    uint256 public UPGRADE_COMMISSION_FEES = 1; // Percent
    uint256 public FEES_REQUEST_TIME = 24 hours; // Fees payment period

    IERC20 public bitsiToken;
    address public compensationFundWallet;

    mapping(address => mapping(uint256 => Policy)) public policies; // User address => token id => Policy
    mapping(address => mapping(uint256 => uint256)) public coinPrices; // User address => token id => price

    event PolicyActivated(address indexed user, uint256 indexed tokenId, uint256 coverage, uint256 startTime, uint256 endTime);
    event ClaimSubmitted(address indexed user, uint256 indexed tokenId, uint256 loss, uint256 compensation, bool extended);
    event CompensationPaid(address indexed user, uint256 indexed tokenId, uint256 compensation);
    event CompensationApproved(address indexed user, uint256 indexed tokenId, uint256 compensation);
    event ParametersUpdated(uint256 newCompensationPercentage, uint256 newPeriod, uint256 newHighLimit, uint256 newLowLimit, uint256 newFees);
    event PolicyUpgraded(address indexed user, uint256 indexed tokenId, uint256 newCoverage);

    constructor(address _bitsiToken, address _compensationFundWallet)  {
        bitsiToken = IERC20(_bitsiToken);
        compensationFundWallet = _compensationFundWallet;
    }

    function activatePolicy(address user, uint256 coinId, uint256 price) external {
        require(policies[user][coinId].active == false, "Policy already exists");

        uint256 startTime = block.timestamp;
        uint256 endTime = block.timestamp + INSURANCE_PERIOD;
        uint256 initialCoverage = (price * COMPENSATION_PERCENTAGE) / 100;

        policies[user][coinId] = Policy({
            coverage: initialCoverage,
            startTime: startTime,
            endTime: endTime,
            active: true,
            approved: false,
            compensation: 0,
            compensationOwner: user,
            isExtended: false,
            isUpgraded: false
        });

        coinPrices[user][coinId] = price;

        // Require commission fees in bitsi tokens
        uint256 fees = (price * ACTIVATE_COMMISSION_FEES) / 100;
        require(bitsiToken.transferFrom(user, compensationFundWallet, fees), "Commission fees not paid");

        emit PolicyActivated(user, coinId, initialCoverage, startTime, endTime);
    }

    function claim(address user, uint256 tokenId, uint256 salePrice) external {
        Policy storage policy = policies[user][tokenId];
        require(policy.active, "No active policy");
        require(policy.approved, "Policy not approved yet");
        require(block.timestamp <= policy.endTime, "Policy expired");
        require(msg.sender == policy.compensationOwner, "Unauthorized claim");

        uint256 loss = coinPrices[user][tokenId] > salePrice ? coinPrices[user][tokenId] - salePrice : 0;
        require(loss >= (coinPrices[user][tokenId] * LOW_COMPENSATION_LIMIT) / 100, "Loss not eligible for compensation");

        uint256 compensation = (salePrice * COMPENSATION_PERCENTAGE) / 100;
        policy.compensation = compensation;

        _payCompensation(user, tokenId, compensation);
        emit ClaimSubmitted(user, tokenId, loss, compensation, policy.isExtended);
    }

    function approveCompensation(address user, uint256 coinId, uint256 compensation) external onlyOwner {
        Policy storage policy = policies[user][coinId];
        require(policy.active, "No active policy");

        policy.approved = true;
        policy.compensation = compensation;

        emit CompensationApproved(user, coinId, compensation);
    }

    function _payCompensation(address user, uint256 tokenId, uint256 compensation) internal {
        Policy storage policy = policies[user][tokenId];
        require(block.timestamp >= policy.startTime + 30 days, "Compensation in freeze period");
        require(bitsiToken.transferFrom(compensationFundWallet, user, compensation), "Compensation payment failed");
        emit CompensationPaid(user, tokenId, compensation);
    }

    function extendPolicy(address user, uint256 coinId) external {
        Policy storage policy = policies[user][coinId];
        require(policy.active, "No active policy");
        require(!policy.isExtended, "Already extended");

        policy.isExtended = true;
        policy.endTime += INSURANCE_PERIOD;

        // Require extension commission fees
        uint256 fees = (coinPrices[user][coinId] * EXTEND_COMMISSION_FEES) / 100;
        require(bitsiToken.transferFrom(user, compensationFundWallet, fees), "Extension fees not paid");
    }

    function upgradePolicy(address user, uint256 coinId, uint256 newPrice) external {
        Policy storage policy = policies[user][coinId];
        require(policy.active, "No active policy");
        require(policy.isExtended, "Policy not extended");
        require(!policy.isUpgraded, "Already upgraded");

        uint256 priceDiff = newPrice - coinPrices[user][coinId];
        policy.coverage += (priceDiff * COMPENSATION_PERCENTAGE) / 100;
        coinPrices[user][coinId] = newPrice;
        policy.isUpgraded = true;

        // Require upgrade commission fees
        uint256 fees = (newPrice * UPGRADE_COMMISSION_FEES) / 100;
        require(bitsiToken.transferFrom(user, compensationFundWallet, fees), "Upgrade fees not paid");

        emit PolicyUpgraded(user, coinId, policy.coverage);
    }

    function updateParameters(uint256 _compensationPercentage, uint256 _insurancePeriod, uint256 _highLimit, uint256 _lowLimit, uint256 _fees) external onlyOwner {
        COMPENSATION_PERCENTAGE = _compensationPercentage;
        INSURANCE_PERIOD = _insurancePeriod;
        HIGH_COMPENSATION_LIMIT = _highLimit;
        LOW_COMPENSATION_LIMIT = _lowLimit;
        ACTIVATE_COMMISSION_FEES = _fees;

        emit ParametersUpdated(_compensationPercentage, _insurancePeriod, _highLimit, _lowLimit, _fees);
    }
}
