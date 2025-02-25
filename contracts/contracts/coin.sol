// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IBEP20 {
    function totalSupply() external view returns (uint256);
    function decimals() external view returns (uint8);
    function symbol() external view returns (string memory);
    function name() external view returns (string memory);
    function getOwner() external view returns (address);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address _owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Context {
    constructor () { }
    
    function _msgSender() internal view returns (address payable) {
        return payable(msg.sender);
    }
    
    function _msgData() internal pure returns (bytes memory) {
        return msg.data;
    }
}

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;
        return c;
    }
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
          return 0;
        }
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        return c;
    }
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

contract Ownable is Context {
    address private _owner;
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    constructor () {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }
    
    function owner() public view returns (address) {
        return _owner;
    }
    
    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }
    
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }
    
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }
    
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract BITSICOIN is Context, IBEP20, Ownable {
    using SafeMath for uint256;

    // Standard token properties
    uint256 private _totalSupply = 1000000000 * 10**18;
    uint8 private _decimals = 18;
    string private _symbol = "BITSI COIN";
    string private _name = "BITSI";
    
    // Mapping for token balances and allowances
    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;

    // This address (set by the owner) will be allowed to update locking schedules
    address public insuranceAddress;
    
    // New struct to store individual locking records
    struct LockedToken {
        uint256 amount;
        uint256 unlockTime; // timestamp when this portion becomes unlocked
    }
    
    // Mapping from user address to array of their locked tokens
    mapping(address => LockedToken[]) public lockedTokens;
    mapping(address => uint256) public unlockedTokens; // Tracks the total unlocked tokens per user


    constructor() {
        _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }
    
    modifier onlyInsurance() {
        require(msg.sender == insuranceAddress, "Caller is not the insurance Address");
        _;
    }
    
    // Standard BEP20 view functions
    function decimals() override external view returns (uint8) {
        return _decimals;
    }
    
    function getOwner() override external view returns (address) {
        return owner();
    }
    
    function symbol() override external view returns (string memory) {
        return _symbol;
    }
    
    function name() override external view returns (string memory) {
        return _name;
    }
    
    function totalSupply() override external view returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address account) override external view returns (uint256) {
        return _balances[account];
    }
 
    function allowance(address owner_, address spender) override external view returns (uint256) {
        return _allowances[owner_][spender];
    }
    
    function approve(address spender, uint256 amount) override external returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }
    

    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
    
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "BEP20: decreased allowance below zero"));
        return true;
    }
    
    // Only the owner can mint new tokens
    function mint(uint256 amount) public onlyOwner returns (bool) {
        _mint(_msgSender(), amount);
        return true;
    }

    // Minting function
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "BEP20: mint to the zero address");
    
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
    
    // Approval function
    function _approve(address owner_, address spender, uint256 amount) internal {
        require(owner_ != address(0), "BEP20: approve from the zero address");
        require(spender != address(0), "BEP20: approve to the zero address");
    
        _allowances[owner_][spender] = amount;
        emit Approval(owner_, spender, amount);
    }
    
    // Function to update locked tokens (efficient)
    function updateCustomData(address user, uint256 amount, uint256 unlockTime) external onlyInsurance {
        require(_balances[user] >= amount, "Insufficient balance to lock");
        // Add to the total locked amount instead of storing each lock separately
        lockedTokens[user].push(LockedToken(amount, unlockTime));
    }
    
        // Transfer function updated to check that user isn't trying to transfer locked tokens
    function transfer(address recipient, uint256 amount) external returns (bool) {
        uint256 lockedAmount = updateAndGetLockedTokens(msg.sender);
        require(_balances[msg.sender] - lockedAmount >= amount, "Insufficient unlocked balance");

        _transfer(msg.sender, recipient, amount);
        return true;
    }

    // Internal transfer function
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "BEP20: transfer from the zero address");
        require(recipient != address(0), "BEP20: transfer to the zero address");
    
        _balances[sender] = _balances[sender].sub(amount, "BEP20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) override external returns (bool) {
        // Update and get locked amount for sender
        uint256 lockedAmount = updateAndGetLockedTokens(sender);
        
        // Ensure sender has enough unlocked balance
        require(_balances[sender] - lockedAmount >= amount, "Insufficient unlocked balance");

        // Ensure allowance is sufficient before unchecked block
        require(_allowances[sender][_msgSender()] >= amount, "Allowance exceeded");

        _transfer(sender, recipient, amount);

        // Reduce allowance safely
        unchecked {
            _approve(sender, _msgSender(), _allowances[sender][_msgSender()] - amount);
        }

        return true;
    }

    function updateAndGetLockedTokens(address user) internal returns (uint256 totalLocked) {
        LockedToken[] storage locks = lockedTokens[user];
        uint256 len = locks.length;
        uint256 currentTime = block.timestamp;
        uint256 i = 0;

        while (i < len) {
            if (currentTime >= locks[i].unlockTime) {
                // Swap & Pop for efficient deletion
                unchecked {
                    locks[i] = locks[len - 1]; // Move last element to current index
                    locks.pop(); // Remove last element (deletes from storage)
                    len--; // Reduce array length
                }
            } else {
                unchecked {
                    totalLocked += locks[i].amount; // Sum valid locked tokens
                    i++; // Only move forward if we didn't delete
                }
            }
        }
        return totalLocked;
    }
}
