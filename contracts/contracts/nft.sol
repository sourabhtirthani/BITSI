// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface INSURANCE  {
    function purchasePolicy(uint256 nftId, uint256 price) external  ;
}

contract BITSINFT is ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    INSURANCE public nftInsurance;
    Counters.Counter private _tokenIds;
    address public compensationWallet;
    uint256 public mintingPrice;
    uint256 public feePercentageCompensationWallet = 3968; // 39.68% (with 2 decimals)
    uint256 public feePercentageOwnerWallet = 6032; // 60.32% (with 2 decimals)
    mapping(bytes32 => bool) public usedSignatures;

    event NFTMinted(address indexed minter, uint256 indexed tokenId);

    constructor(
        string memory name,
        string memory symbol,
        address _compensationWallet,
        uint256 _mintingPrice,
        address addInsurance
    ) ERC721(name, symbol) Ownable (msg.sender){
        compensationWallet = _compensationWallet;
        mintingPrice = _mintingPrice;
        nftInsurance=INSURANCE(addInsurance);
    }

    function mint(
        address to,
        uint256[] calldata tokenIds,
        string [] calldata tokenURIs,
        uint256 price
    ) external payable nonReentrant {
        require(price == mintingPrice, "Incorrect price");
        require(msg.value == price * tokenIds.length, "Incorrect payment amount");
        // Mint the NFTs
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _mint(to, tokenIds[i]);
            _setTokenURI(tokenIds[i], tokenURIs[i]);
            nftInsurance.purchasePolicy(tokenIds[i], msg.value/tokenIds.length);
            emit NFTMinted(to, tokenIds[i]);
        }

        // Calculate and distribute fees
        uint256 totalFee = msg.value;
        uint256 feeForCompensation = (totalFee * feePercentageCompensationWallet) / 10000;
        uint256 feeForOwner = (totalFee * feePercentageOwnerWallet) / 10000;

        payable(compensationWallet).transfer(feeForCompensation);
        payable(owner()).transfer(feeForOwner);
    }

    function setMintingPrice(uint256 _mintingPrice) external onlyOwner {
        mintingPrice = _mintingPrice;
    }

    function setCompensationWallet(address _compensationWallet) external onlyOwner {
        compensationWallet = _compensationWallet;
    }

    function setFeePercentages(uint256 _feePercentageCompensationWallet, uint256 _feePercentageOwnerWallet) external onlyOwner {
        require(_feePercentageCompensationWallet + _feePercentageOwnerWallet == 10000, "Total fees must equal 100%");
        feePercentageCompensationWallet = _feePercentageCompensationWallet;
        feePercentageOwnerWallet = _feePercentageOwnerWallet;
    }
}
