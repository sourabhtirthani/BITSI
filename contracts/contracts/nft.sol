// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
contract BITSINFT is ERC721URIStorage, Ownable {

    bool private isSaleStart=true;
    constructor(string memory name,string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {}

    struct Collection {
        uint256 id;
        uint256 price;
    }

    struct NFT {
        uint256 id;
        address owner;
        uint256 price;
        uint256 collectionId;
        bool isForReSale;
    }
    mapping(uint256 => Collection) public collections;
    mapping(uint256 => bool) public collectionExists;
    mapping (uint256=>NFT) public nfts;

    // function for mint collections 
    function mintCollection(uint256 collectionId, uint256 price) external  {
        require(!collectionExists[collectionId], "Collection already exists");
        collections[collectionId] = Collection(collectionId, price);
        collectionExists[collectionId] = true;
    }
    
    function mint(address to, uint256 collectionId, string memory tokenURI,uint256 tokenId ) external   {
        // Check that collection exits or not 
        require(collectionExists[collectionId], "Collection does not exist");
        // Mint the NFT
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        nfts[tokenId].owner=to;
        nfts[tokenId].price=collections[collectionId].price;
        nfts[tokenId].id=tokenId;
        nfts[tokenId].collectionId=collectionId;
        nfts[tokenId].isForReSale=false;
    }

    function toggleResell(bool _isResell) external onlyOwner{
        isSaleStart=_isResell;
    }


    // New function to buy an NFT
     function buyNFT(uint256[] calldata tokenIds, uint256[] calldata buyPrices) external payable {
        require(isSaleStart, "Sale is not yet started");
        require(tokenIds.length == buyPrices.length, "Token IDs and buy prices must match");

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            uint256 buyPrice = buyPrices[i];

            require(ownerOf(tokenId) != msg.sender, "You cannot buy your own NFT");

            address currentOwner = ownerOf(tokenId);
            uint256 collectionPrice = collections[nfts[tokenId].collectionId].price;

            // Check if the NFT is owned by the admin
            if (currentOwner == owner()) {
                // Calculate price based on collection price
                require(buyPrice >= collectionPrice, "Insufficient funds for admin-owned NFT");
            } else {
                // Check if the NFT is up for resale
                require(nfts[tokenId].isForReSale, "NFT is not available for resale");
                // Get the resell price
                uint256 resellPrice = nfts[tokenId].price;
                require(buyPrice >= resellPrice, "Insufficient funds for user-owned NFT");
            }

            // Transfer funds to the NFT owner
            payable(currentOwner).transfer(buyPrice);

            // Transfer NFT ownership
            _transfer(currentOwner, msg.sender, tokenId);
            nfts[tokenId].owner=msg.sender;
            // Reset resell flag for user-owned NFTs
            if (currentOwner != owner()) {
                nfts[tokenId].isForReSale = false;
            }
        }
    }
    
}
