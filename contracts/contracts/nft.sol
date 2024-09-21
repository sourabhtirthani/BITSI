// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;
 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
interface INSURANCE  {
    function purchasePolicy(uint256 nftId, uint256 price) external  ;
}
contract BITSINFT is ERC721URIStorage, Ownable {
    INSURANCE public nftInsurance;
    bool private isSaleStart=true;
    address public compensationWallet;
    address public ownerWallet;

    uint256 public feePercentageCompensationWallet = 3968; // 39.68% (with 2 decimals)
    uint256 public feePercentageOwnerWallet = 6032; // 60.32% (with 2 decimals)
    constructor(string memory name,string memory symbol,address addInsurance, address _compensationWallet) ERC721(name, symbol) Ownable(msg.sender) {
        compensationWallet = _compensationWallet;
        nftInsurance=INSURANCE(addInsurance);
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
    mapping (uint256=>NFT) public nfts;
    
    function mintCollection(uint256 collectionId, uint256 price) external  {
        require(!collectionExists[collectionId], "Collection already exists");
        collections[collectionId] = Collection(collectionId, price,msg.sender);
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
        nftInsurance.purchasePolicy(tokenId,collections[collectionId].price);
    }
    
    function mintBulk(address to,uint256 collectionId, string[] memory tokenURI,uint256[] calldata tokenId ) external onlyOwner  {
       
        require(collectionExists[collectionId], "Collection does not exist");
        // Mint the NFT in bulk 
        for (uint256 i = 0; i < tokenId.length; i++) {
            _safeMint(to, tokenId[i]);
            _setTokenURI(tokenId[i], tokenURI[i]);
            nfts[tokenId[i]].owner=to;
            nfts[tokenId[i]].price=collections[collectionId].price;
            nfts[tokenId[i]].id=tokenId[i];
            nfts[tokenId[i]].collectionId=collectionId;
            nftInsurance.purchasePolicy(tokenId[i],collections[collectionId].price);
        }
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
            require(currentOwner==owner(),"only owner nfts can sell here");
            uint256 collectionPrice = collections[nfts[tokenId].collectionId].price;
            require(buyPrice >= collectionPrice, "Insufficient funds for admin-owned NFT");
 
            uint256 feeForCompensation = (buyPrice * feePercentageCompensationWallet) / 10000;
            uint256 feeForOwner = (buyPrice * feePercentageOwnerWallet) / 10000;
 
            payable(compensationWallet).transfer(feeForCompensation);
            payable(ownerWallet).transfer(feeForOwner);
            
            _transfer(currentOwner, msg.sender, tokenId);
            nfts[tokenId].owner=msg.sender;
        }
    }
    
    function setCompensationWallet(address _compensationWallet,address _ownerWallet) external onlyOwner {
        compensationWallet = _compensationWallet;
        ownerWallet=_ownerWallet;
    }
 
    function setFeePercentages(uint256 _feePercentageCompensationWallet, uint256 _feePercentageOwnerWallet) external onlyOwner {
        require(_feePercentageCompensationWallet + _feePercentageOwnerWallet == 10000, "Total fees must equal 100%");
        feePercentageCompensationWallet = _feePercentageCompensationWallet;
        feePercentageOwnerWallet = _feePercentageOwnerWallet;
    }

    function changeCollectionPrice (uint256 _collectionId,uint256 _newPrice) external {
        require(collectionExists[_collectionId], "Collection does not exist");
        require(collections[_collectionId].owner==msg.sender,"You are not the owner of this collection");
        collections[_collectionId].price =_newPrice;
    }

    function burnNfts(uint256 tokenId) external onlyOwner{
        require(ownerOf(tokenId)!=address(0) || ownerOf(tokenId)==owner(),"You are not the owner of this nft so you can not burn");
        _burn(tokenId);
    }

}