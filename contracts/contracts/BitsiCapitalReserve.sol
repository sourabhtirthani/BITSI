// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract BitsiCapitalReserve is Ownable {
    IERC20 public usdtToken;
    IERC20 public bitsiToken;
    address public admin;
    address public insuranceContract;


    mapping(address => uint256) private lockedUSDT;
    mapping(address => uint256) private lockedBITSI;

    event FundsAdded(address indexed sender, uint256 amount, bool isUSDT);
    event FundsLocked(address indexed user, uint256 amount, bool isUSDT);
    event FundsUnlocked(address indexed user, uint256 amount, bool isUSDT);
    event FundsWithdrawn(address indexed user, uint256 amount, bool isUSDT);
    event AdminUpdated(address newAdmin);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    modifier onlyBitsiInsurance() {
        require(msg.sender == insuranceContract, "Not authorized");
        _;
    }

    constructor(address _usdtToken, address _bitsiToken, address _admin, address _insuranceContract) Ownable(msg.sender) {
        usdtToken = IERC20(_usdtToken);
        bitsiToken = IERC20(_bitsiToken);
        admin = _admin;
        insuranceContract = _insuranceContract; // Set the insurance contract at deployment
    }

    function updateAdmin(address newAdmin) external onlyOwner {
        require(newAdmin != address(0), "Invalid address");
        admin = newAdmin;
        emit AdminUpdated(newAdmin);
    }

    function addFunds(uint256 amount, bool isUSDT) external {
        require(amount > 0, "Invalid amount");
        
        if (isUSDT) {
            require(usdtToken.transferFrom(msg.sender, address(this), amount), "USDT transfer failed");
        } else {
            require(bitsiToken.transferFrom(msg.sender, address(this), amount), "BITSI transfer failed");
        }
        
        emit FundsAdded(msg.sender, amount, isUSDT);
    }

    function lockFunds(address user, uint256 amount, bool isUSDT) external onlyAdmin {
        require(amount > 0, "Invalid amount");
        
        if (isUSDT) {
            require(usdtToken.balanceOf(address(this)) >= amount, "Insufficient USDT in reserve");
            lockedUSDT[user] += amount; // Lock USDT for insurance coverage
        } else {
            require(bitsiToken.balanceOf(address(this)) >= amount, "Insufficient BITSI in reserve");
            lockedBITSI[user] += amount; // Lock BITSI for withdrawal
        }
        
        emit FundsLocked(user, amount, isUSDT);
    }

    function unlockUSDT(address user, uint256 amount) external onlyAdmin {
        require(amount > 0, "Invalid amount");
        require(lockedUSDT[user] >= amount, "Insufficient locked USDT");

        lockedUSDT[user] -= amount;
        emit FundsUnlocked(user, amount, true);
    }

    function unlockBITSI(address user, uint256 amount) external onlyAdmin {
        require(amount > 0, "Invalid amount");
        require(lockedBITSI[user] >= amount, "Insufficient locked BITSI");

        lockedBITSI[user] -= amount;
        emit FundsUnlocked(user, amount, false);
    }

    function unlockUSDTAndLockBITSI(address user, uint256 usdtAmount, uint256 bitsiAmount) external onlyAdmin {
        require(usdtAmount > 0 && bitsiAmount > 0, "Invalid amounts");
        require(lockedUSDT[user] >= usdtAmount, "Insufficient locked USDT");
        require(bitsiToken.balanceOf(address(this)) >= bitsiAmount, "Insufficient BITSI in reserve");
        
        lockedUSDT[user] -= usdtAmount; // Unlock USDT
        lockedBITSI[user] += bitsiAmount; // Lock BITSI for compensation
        
        emit FundsUnlocked(user, usdtAmount, true);
        emit FundsLocked(user, bitsiAmount, false);
    }

    function withdrawCompensation(address user, uint256 amount) external onlyBitsiInsurance{
        require(lockedBITSI[user] >= amount, "Insufficient locked BITSI");
        
        lockedBITSI[user] -= amount;
        require(bitsiToken.transfer(user, amount), "BITSI Transfer failed");
        
        emit FundsWithdrawn(user, amount, false);
    }

    function getLockedFunds(address user, bool isUSDT) external view returns (uint256) {
        return isUSDT ? lockedUSDT[user] : lockedBITSI[user];
    }

    function getBitsiBalance() external view returns (uint256) {
        return bitsiToken.balanceOf(address(this));
    }

    function getUSDTBalance() external view returns (uint256) {
        return usdtToken.balanceOf(address(this));
    }
}
