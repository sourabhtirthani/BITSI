// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface INSURANCE  {
    function purchasePolicy(uint256 nftId, uint256 price) external;
}

contract BITSINFT is ERC721A, Ownable {
    INSURANCE public nftInsurance;
    bool private isSaleStart = true;
    address public compensationWallet;
    address public ownerWallet;

    uint256 public feePercentageCompensationWallet = 3968; // 39.68% (with 2 decimals)
    uint256 public feePercentageOwnerWallet = 6032; // 60.32% (with 2 decimals)

    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory name, string memory symbol, address addInsurance, address _compensationWallet) ERC721A(name, symbol) Ownable(msg.sender) {
        compensationWallet = _compensationWallet;
        nftInsurance = INSURANCE(addInsurance);
    }

    struct Collection {
        uint256 id;
        uint256 price;
        address owner;
    }

    struct NFT {
        uint256 id;
        address owner;
        uint256 price;
        uint256 collectionId;
    }

    mapping(uint256 => Collection) public collections;
    mapping(uint256 => bool) public collectionExists;
    mapping(uint256 => NFT) public nfts;

    function mintCollection(uint256 collectionId, uint256 price) external {
        require(!collectionExists[collectionId], "Collection already exists");
        collections[collectionId] = Collection(collectionId, price, msg.sender);
        collectionExists[collectionId] = true;
    }

    function mint(address to, uint256 collectionId, string[] memory tokenURIs) external onlyOwner {
    require(collectionExists[collectionId], "Collection does not exist");
    uint256 quantity = tokenURIs.length;
    uint256 startTokenId = totalSupply();  // Start from the current total supply

    _safeMint(to, quantity);  // Mint multiple tokens at once

    for (uint256 i = 0; i < quantity; i++) {
        uint256 tokenId = startTokenId + i;  // Calculate token ID based on totalSupply
        _setTokenURI(tokenId, tokenURIs[i]);  // Set token URI for each token
        nfts[tokenId].owner = to;
        nfts[tokenId].price = collections[collectionId].price;
        nfts[tokenId].id = tokenId;
        nfts[tokenId].collectionId = collectionId;
        nftInsurance.purchasePolicy(tokenId, collections[collectionId].price);
    }
}

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function toggleResell(bool _isResell) external onlyOwner {
        isSaleStart = _isResell;
    }

    function buyNFT(uint256[] calldata tokenIds, uint256[] calldata buyPrices) external payable {
        require(isSaleStart, "Sale is not yet started");
        require(tokenIds.length == buyPrices.length, "Token IDs and buy prices must match");

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            uint256 buyPrice = buyPrices[i];

            require(ownerOf(tokenId) != msg.sender, "You cannot buy your own NFT");

            address currentOwner = ownerOf(tokenId);
            require(currentOwner == owner(), "Only owner NFTs can sell here");

            uint256 collectionPrice = collections[nfts[tokenId].collectionId].price;
            require(buyPrice >= collectionPrice, "Insufficient funds for admin-owned NFT");

            uint256 feeForCompensation = (buyPrice * feePercentageCompensationWallet) / 10000;
            uint256 feeForOwner = (buyPrice * feePercentageOwnerWallet) / 10000;

            payable(compensationWallet).transfer(feeForCompensation);
            payable(ownerWallet).transfer(feeForOwner);

            transferFrom(currentOwner, msg.sender, tokenId);
            nfts[tokenId].owner = msg.sender;
        }
    }

    function setCompensationWallet(address _compensationWallet, address _ownerWallet) external onlyOwner {
        compensationWallet = _compensationWallet;
        ownerWallet = _ownerWallet;
    }

    function setFeePercentages(uint256 _feePercentageCompensationWallet, uint256 _feePercentageOwnerWallet) external onlyOwner {
        require(_feePercentageCompensationWallet + _feePercentageOwnerWallet == 10000, "Total fees must equal 100%");
        feePercentageCompensationWallet = _feePercentageCompensationWallet;
        feePercentageOwnerWallet = _feePercentageOwnerWallet;
    }

    function changeCollectionPrice(uint256 _collectionId, uint256 _newPrice) external {
        require(collectionExists[_collectionId], "Collection does not exist");
        require(collections[_collectionId].owner == msg.sender, "You are not the owner of this collection");
        collections[_collectionId].price = _newPrice;
    }

    function burnNfts(uint256 tokenId) external onlyOwner {
        require(ownerOf(tokenId) != address(0) || ownerOf(tokenId) == owner(), "You are not the owner of this NFT so you cannot burn");
        _burn(tokenId);
    }
}
