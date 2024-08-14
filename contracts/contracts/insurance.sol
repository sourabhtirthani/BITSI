// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTInsurance is Ownable {

    struct Policy {
        uint256 coverage;
        uint256 startTime;
        uint256 endTime;
        bool active;
        bool approved;
        uint256 compensation;
        address compensationOwner;
    }

    uint256 public constant NFT_INSURANCE_COVERAGE = 100; // Percent
    uint256 public constant NFT_INSURANCE_PERIOD_MONTH = 24; // Months
    uint256 public constant NFT_INSURANCE_COMPENSATION_FUND = 38; // Percent
    uint256 public constant NFT_INSURANCE_MONTHLY_GROWTH_RATE = 1; // Percent
    uint256 public constant NFT_INSURANCE_HIGH_COMPENSATION_LIMIT = 90; // Percent
    uint256 public constant NFT_INSURANCE_FREEZE_PERIOD = 7 days; // Days

    IERC20 public bitsiToken;
    address public compensationFundWallet;
    address public ownerWallet;

    mapping(uint256 => Policy) public policies;
    mapping(uint256 => uint256) public nftPrices;

    event PolicyPurchased(uint256 indexed nftId, address indexed buyer, uint256 coverage, uint256 startTime, uint256 endTime);
    event PolicyExpired(uint256 indexed nftId);
    event ClaimSubmitted(uint256 indexed nftId, uint256 loss, uint256 compensation, bool extended);
    event CompensationPaid(uint256 indexed nftId, uint256 compensation);

    constructor(address _bitsiToken, address _compensationFundWallet, address _ownerWallet) Ownable(msg.sender){
        bitsiToken = IERC20(_bitsiToken);
        compensationFundWallet = _compensationFundWallet;
        ownerWallet = _ownerWallet;
    }

    function purchasePolicy(uint256 nftId, uint256 price) external  {
        require(policies[nftId].active == false, "Policy already exists");

        uint256 startTime = block.timestamp;
        uint256 endTime = block.timestamp + NFT_INSURANCE_PERIOD_MONTH * 30 days;
        uint256 initialCoverage = (price * NFT_INSURANCE_COVERAGE) / 100;

        policies[nftId] = Policy({
            coverage: initialCoverage,
            startTime: startTime,
            endTime: endTime,
            active: true,
            approved: false,
            compensation:0,
            compensationOwner:address(0)
        });

        nftPrices[nftId] = price;

        emit PolicyPurchased(nftId, msg.sender, initialCoverage, startTime, endTime);
    }

    function claim(uint256 nftId, uint256 salePrice) external {
        Policy storage policy = policies[nftId];
        require(policy.active, "No active policy");
        require(policy.approved, "Policy is not approved yet");
        require(block.timestamp <= policy.endTime, "Policy expired");
        require(msg.sender==policy.compensationOwner,"you can not claim");
        uint256 loss = nftPrices[nftId] > salePrice ? nftPrices[nftId] - salePrice : 0;
        require(loss >= (nftPrices[nftId] * NFT_INSURANCE_HIGH_COMPENSATION_LIMIT) / 100, "Loss not eligible for compensation");

        uint256 compensation = policy.compensation;
        policy.coverage = salePrice;
        // Basic policy
        _payCompensation(nftId, compensation);
        emit ClaimSubmitted(nftId, loss, compensation, false);
    }

    function approveCompensation(uint256 nftId,uint256 compensation,address compensationOwner) external onlyOwner{
        Policy storage policy = policies[nftId];
        require(policy.active, "No active policy");
        policy.approved=true;
        policy.compensation=compensation;
        policy.compensationOwner=compensationOwner;
    }
    function _payCompensation(uint256 nftId, uint256 compensation) internal {
        require(block.timestamp >= policies[nftId].startTime + NFT_INSURANCE_FREEZE_PERIOD, "Compensation is in freeze period");
        bitsiToken.transferFrom(compensationFundWallet, msg.sender, compensation);
        emit CompensationPaid(nftId, compensation);
    }

    function expirePolicy(uint256 nftId) external onlyOwner {
        Policy storage policy = policies[nftId];
        require(block.timestamp > policy.endTime, "Policy not yet expired");
        policy.active = false;
        emit PolicyExpired(nftId);
    }
}
