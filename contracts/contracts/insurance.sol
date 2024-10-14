// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;
/**
 * @dev Interface of the ERC-165 standard, as defined in the
 * https://eips.ethereum.org/EIPS/eip-165[ERC].
 *
 * Implementers can declare support of contract interfaces, which can then be
 * queried by others ({ERC165Checker}).
 *
 * For an implementation, see {ERC165}.
 */
interface IERC165 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section]
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
/**
 * @dev Required interface of an ERC-721 compliant contract.
 */
interface IERC721 is IERC165 {
   
    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);
}
/**
 * @dev Interface of the ERC-20 standard as defined in the ERC.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * The initial owner is set to the address provided by the deployer. This can
 * later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error OwnableUnauthorizedAccount(address account);

    /**
     * @dev The owner is not a valid owner account. (eg. `address(0)`)
     */
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

contract NFTInsurance is Ownable {
    struct Policy {
        uint256 coverage;
        uint256 startTime;
        uint256 endTime;
        bool active;
        bool approved;
        uint256 compensation;
        address compensationOwner;
        bool isExtended;
    }

    uint256 public NFT_INSURANCE_COVERAGE = 10000; // Percent
    uint256 public NFT_INSURANCE_PERIOD_MONTH = 12; // Months
    uint256 public NFT_INSURANCE_MONTHLY_GROWTH_RATE = 100; // Percent
    uint256 public NFT_INSURANCE_HIGH_COMPENSATION_LIMIT = 9000; // Percent
    uint256 public NFT_INSURANCE_FREEZE_PERIOD = 30 days; // Days
    uint256 public NFT_INSURANCE_ACTIVECTION_FEES =100 ; // 1 %
    uint256 public DIVIDEN =100 ; 

    IERC20 public bitsiToken;
    IERC721 public bitsiNFT;
    address public compensationFundWallet;

    mapping(uint256 => Policy) public policies;
    mapping(uint256 => uint256) public nftPrices;

    event PolicyPurchased(uint256 indexed nftId, address indexed buyer, uint256 coverage, uint256 startTime, uint256 endTime);
    event ClaimSubmitted(uint256 indexed nftId, uint256 loss, uint256 compensation, bool extended);
    event CompensationPaid(uint256 indexed nftId, uint256 compensation);
    event CompensationApproved(uint256 indexed nftId, uint256 compensation, address indexed compensationOwner);
    event ParameterUpdated(uint256 newCoverage, uint256 newPeriod, uint256 newCompensationLimit, uint256 newFreezePeriod, address newCompensationFundWallet,uint256 activationFees);
    event UpgradePolicy(uint256 indexed nftId,uint256 newPrice);
    event ExtendPolicy(uint256 indexed nftId,uint256 time);
    constructor(address _bitsiToken, address _compensationFundWallet,address _bitsiNFT) Ownable(msg.sender) {
        bitsiToken = IERC20(_bitsiToken);
        bitsiNFT = IERC721(_bitsiNFT);
        compensationFundWallet = _compensationFundWallet;
    }

    function purchasePolicy(uint256 nftId, uint256 price,uint256 activationFees) external {
        require(policies[nftId].active == false, "Policy already exists");
        require(activationFees>=(price*NFT_INSURANCE_ACTIVECTION_FEES)/100*DIVIDEN,"Not enough Bitsi coin to purchase");
        bitsiToken.transferFrom(msg.sender,address(this),activationFees );
        uint256 startTime = block.timestamp;
        uint256 endTime = block.timestamp + NFT_INSURANCE_PERIOD_MONTH * 30 days;
        uint256 initialCoverage = price ;

        policies[nftId] = Policy({
            coverage: initialCoverage,
            startTime: startTime,
            endTime: endTime,
            active: true,
            approved: false,
            compensation: 0,
            compensationOwner: address(0),
            isExtended:false
        });

        nftPrices[nftId] = price;

        emit PolicyPurchased(nftId, msg.sender, initialCoverage, startTime, endTime);
    }

    function claim(uint256 nftId, uint256 salePrice) external {
        Policy storage policy = policies[nftId];
        require(policy.active, "No active policy");
        require(policy.approved, "Policy is not approved yet");
        require(block.timestamp <= policy.endTime, "Policy expired");
        require(msg.sender == policy.compensationOwner, "Unauthorized claim");

        uint256 loss = nftPrices[nftId] > salePrice ? nftPrices[nftId] - salePrice : 0;
        require(loss >= (nftPrices[nftId] * NFT_INSURANCE_HIGH_COMPENSATION_LIMIT) / 100, "Loss not eligible for compensation");

        uint256 compensation = policy.compensation;
        policy.coverage = salePrice;

        _payCompensation(nftId, compensation);
        emit ClaimSubmitted(nftId, loss, compensation, false);
    }

    function approveCompensation(uint256 nftId, uint256 compensation, address compensationOwner) external onlyOwner {
        Policy storage policy = policies[nftId];
        require(policy.active, "No active policy");

        policy.approved = true;
        policy.compensation = compensation;
        policy.compensationOwner = compensationOwner;
        emit CompensationApproved(nftId, compensation, compensationOwner);
    }

    function _payCompensation(uint256 nftId, uint256 compensation) internal {
        require(block.timestamp >= policies[nftId].startTime + NFT_INSURANCE_FREEZE_PERIOD, "Compensation is in freeze period");
        bitsiToken.transferFrom(compensationFundWallet, msg.sender, compensation);
    }

    function expirePolicy(uint256 nftId) external onlyOwner {
        Policy storage policy = policies[nftId];
        require(block.timestamp > policy.endTime, "Policy not yet expired");
        policy.active = false;
    }

    function updateBitsiToken(address _newBitsiToken,address _newBitsiNFT) external onlyOwner {
        bitsiToken = IERC20(_newBitsiToken);
        bitsiNFT = IERC721(_newBitsiNFT);
    }
    function upgradePolicy(uint256 nftId,uint256 newPrice) external onlyOwner {
        Policy storage policy = policies[nftId];
        policy.coverage=newPrice;
        emit UpgradePolicy(nftId,newPrice);
    }
    function extendPolicy(uint256 nftId,uint256 activationFees) external {
        Policy storage policy = policies[nftId];
        require(bitsiNFT.ownerOf(nftId)==msg.sender,"You are not the owner of nft");
        require(!policy.isExtended,"You can not extend time period again");
        require(activationFees>=(policy.coverage*NFT_INSURANCE_ACTIVECTION_FEES)/100*DIVIDEN,"Not enough Bitsi coin to purchase");

        bitsiToken.transferFrom(msg.sender,address(this),activationFees );
        policy.isExtended=true;
        policy.endTime=block.timestamp+ 365 days;
        emit ExtendPolicy(nftId, block.timestamp+ 365 days);
    }
    function updateParameter(address _compensationFundWallet,uint256 _NFT_INSURANCE_ACTIVECTION_FEES, uint256 _NFT_INSURANCE_COVERAGE, uint256 _NFT_INSURANCE_PERIOD_MONTH, uint256 _NFT_INSURANCE_HIGH_COMPENSATION_LIMIT, uint256 _NFT_INSURANCE_FREEZE_PERIOD) external onlyOwner {
        NFT_INSURANCE_COVERAGE = _NFT_INSURANCE_COVERAGE; // Percent
        NFT_INSURANCE_PERIOD_MONTH = _NFT_INSURANCE_PERIOD_MONTH; // Months
        NFT_INSURANCE_HIGH_COMPENSATION_LIMIT = _NFT_INSURANCE_HIGH_COMPENSATION_LIMIT; // Percent
        NFT_INSURANCE_FREEZE_PERIOD = _NFT_INSURANCE_FREEZE_PERIOD; // Days
        compensationFundWallet = _compensationFundWallet;
        NFT_INSURANCE_ACTIVECTION_FEES=_NFT_INSURANCE_ACTIVECTION_FEES;
        emit ParameterUpdated(_NFT_INSURANCE_COVERAGE, _NFT_INSURANCE_PERIOD_MONTH, _NFT_INSURANCE_HIGH_COMPENSATION_LIMIT, _NFT_INSURANCE_FREEZE_PERIOD, _compensationFundWallet,_NFT_INSURANCE_ACTIVECTION_FEES);
    }

    function deletePolicy(uint256 nftId) external  {
         policies[nftId] = Policy({
            coverage: 0,
            startTime: 0,
            endTime: 0,
            active: false,
            approved: false,
            compensation: 0,
            compensationOwner: address(0),
            isExtended:false
        });
    }
}