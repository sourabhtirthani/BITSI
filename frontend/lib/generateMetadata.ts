import { uploadFile } from "./uploadToCloud";


const generateRandomTokenId = (): number => {
    return Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
  };

export const generateMetadata = async(address : string ,  nftName : string, description : string, imageUrl : string) => {
  const metadata = {
    name: nftName,
    description : description,
    imageUrl : imageUrl,
    artist : address
  };

  const metadataContent = JSON.stringify(metadata, null, 2);
  const tokenId = generateRandomTokenId();
  const fileName = `${tokenId}.json`;
  const result = await uploadFile(metadataContent, fileName, 'metadata_folder');
  console.log(tokenId)
  console.log(result.secure_url)
  return { tokenId, tokenURI: result.secure_url };
};

