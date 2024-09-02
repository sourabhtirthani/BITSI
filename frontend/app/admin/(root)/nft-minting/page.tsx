'use client'
import { uploadCollection } from '@/actions/uploadNft';
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel';
import Dropdown from '@/components/Dropdown'
import { nftMintingDropDown } from '@/constants';
import { generateMetadata } from '@/lib/generateMetadata';
import { uploadImage } from '@/lib/uploadToCloud';
import { generateRandomTokenId } from '@/lib/utils';
import { DataOfNFtJsonAdmin } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react'
import { useAccount } from 'wagmi';

const NftMinting = () => {
  const [wallet, setWallet] = useState('');
  const [numberOfNFtFiles, setNumberOfNftFiles] = useState(0);
  const { address, isConnected } = useAccount();
  const [notUploaded, setNotUploaded] = useState<string[]>([])
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      console.log('in here ')
      if(!address){
        console.log("no wallets connected")
        return;
      }
      const stringAddress: string = address;
      const collectionName = event.currentTarget.elements.namedItem('collectionName') as HTMLInputElement;
      const jsonInput = event.currentTarget.elements.namedItem('nftMetaData') as HTMLInputElement;
      const collectionPrice = event.currentTarget.elements.namedItem('price') as HTMLInputElement;
      const collectionDescription = event.currentTarget.elements.namedItem('collectionDescription') as HTMLInputElement;
      const collectionImg = event.currentTarget.elements.namedItem('collectionFile') as HTMLInputElement;
      const allNftImages = event.currentTarget.elements.namedItem('nftFile') as HTMLInputElement;
      if (!jsonInput || !collectionPrice || !collectionDescription || !collectionImg || !collectionImg.files || !allNftImages || !collectionName) {
        console.log('error invalude deteails')
        return;
      }
      const priceInWeiOfCollection = Number(Math.floor(parseFloat(collectionPrice.value) * 10 ** 18));
      const idOfCollection = generateRandomTokenId();
      // const transaction = await writeContractAsync({
      //   address: contractAddress,
      //   abi: contractABI,
      //   functionName: 'mintCollection',
      //   args: [idOfCollection, priceInWei],
      // });
      console.log(collectionPrice.value)
      const transaction = true;
      if (transaction) {
        const formData = new FormData();
        formData.append("name", collectionName.value as string);
        formData.append("collectionFile", collectionImg.files[0]);
        formData.append("description", collectionDescription.value);
        formData.append("floorPrice", collectionPrice.value);
        // const res = await uploadCollection(formData , idOfCollection , stringAddress);

        if (jsonInput.files && jsonInput.files[0]) {
          const file = jsonInput.files[0];
          console.log(file)
          const reader = new FileReader();

          reader.onload = async (e) => {
            try {
              const fileContent = e.target?.result as string;
              const jsonData = JSON.parse(fileContent);
              const jsonMap = new Map<string, DataOfNFtJsonAdmin>();
              for (let i = 0; i < jsonData.length; i++) {
                jsonMap.set(jsonData[i].image, jsonData[i]);
              }



              if (allNftImages.files) {
                for (let j = 0; j < allNftImages.files?.length; j++) {
                  const nftFileName = allNftImages.files[j].name; // this is the name of the image that was uplaoded and is compared to the image field in the json 
                  console.log(allNftImages.files[j].name);
                  console.log(JSON.stringify(jsonMap.get(nftFileName)))
                  if (jsonMap.has(nftFileName)) {
                    try {
                      const matchingJson = jsonMap.get(nftFileName);
                      console.log(`Match found for ${nftFileName}:`, matchingJson?.image);
                      console.log(`json dagta is : ${matchingJson?.description} ${matchingJson?.image} ${matchingJson?.name} and the nft fiel name is : ${nftFileName}`)
                      const formDataNft = new FormData();
                      formDataNft.append("nftFile", allNftImages.files[j])
                      const nftImageUrl = await uploadImage(formDataNft, 'uploads', 'nftFile', true); 
                      if (nftImageUrl.secure_url == '') {
                        throw new Error('NO image url is returned')
                      } 
                     
                      console.log(`the secure url for the image is : ${nftImageUrl.secure_url}`)
                      const { tokenId, tokenURI } = await generateMetadata(stringAddress, matchingJson?.name ?? '', matchingJson?.description ?? '', nftImageUrl.secure_url)
                      console.log(`the token id is : ${tokenId}`)
                      console.log(tokenURI)
                      console.log(`json format`)
                      if(!tokenId || !tokenURI){
                        throw new Error('no Token URI found')
                      }
                    } catch (error) {
                      setNotUploaded(prev => [...prev, nftFileName]);
                    }
                  } else {
                    console.log(`No match found for ${nftFileName}`);
                    setNotUploaded(prev => [...prev, nftFileName]);
                  }
                  console.log(`the file name form the selected file is : ${allNftImages.files[j].name}`)
                }
              }
            } catch (error) {
              console.error("Error parsing JSON file:", error);
            }
          };

          reader.readAsText(file);
        } else {
          console.error("No file selected");
        }
      }

    } catch (error) {
      console.log('in the error caluse')
      console.log(error)
    }
  };

  return (
    <div className='p-8 max-md:p-4 w-full'>
      <div className='flex justify-between mb-14 max-md:mb-7 items-center'>
        <p className='font-manrope font-bold text-[18px] text-success-511'>NFT MINTING </p>
        <AdminAdressButtonForAdminPanel />
      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-[18px] text-white font-montserrat font-bold '>Select Wallet*</p>
        <Dropdown items={nftMintingDropDown} showIcon={false} buttonName='Select Your Wallet' arrowImage='/icons/arrow-dropdown.svg' setValue={setWallet} />
        <button className='bg-success-511 px-28 mt-8 self-end py-2 text-white font-bold text-[20px] w-fit rounded-3xl'>Mint</button>
      </div>
      <div>
        <p className='font-bold text-[22px] font-manrope text-white mb-4 mt-20'>Upload Collection Image and select all the Nft images</p>
        <form onSubmit={handleFormSubmit}>
          <div className='flex w-full max-md:flex-col gap-3 flex-wrap'>

            <div className='flex justify-between max-sm:flex-col w-full gap-4'>
              <div className='flex flex-col w-1/2'>
                <label htmlFor='price' className='font-montserrat mt-2 mb-2 text-white text-[22px] font-semibold '>Collection Price</label>
                <input placeholder='Collection Price' id='price' name='price' required type='number' step='0.001' min='0' className='p-3 no-spinners w-full rounded' /></div>

              <div className='flex flex-col w-1/2'>
                <label htmlFor='collectionName' className='font-montserrat mt-2 mb-2 text-white text-[22px] font-semibold '>Collection Name</label>
                <input placeholder='Collection Name' id='collectionName' name='collectionName' required type='text' className='p-3  w-full rounded' /></div>
              <div className='flex flex-col  w-1/2'>
                <label htmlFor='collectionDescription' className='font-montserrat mt-2 mb-2 text-white text-[22px] font-semibold '>Collection description</label>
                <input placeholder='Collection Description' id='collectionDescription' name='collectionDescription' type='text' className='p-8 no-spinners w-full rounded' /></div>
            </div>
            <div className='flex flex-col'>
              <input required type='file' name='collectionFile' className='hidden' id='collectionFile' accept=".jpg,.png,.svg,.gif" />
              <div className='flex max-lg:flex-col justify-between max-lg:gap-10  max-lg:justify-center max-lg:items-center'>
                <label htmlFor="collectionFile" className='w-fit h-fit'>
                  <div className='flex justify-between'>
                    <div className='  border-2 border-dashed px-14 max-sm:px-5 border-success-529 h-[212px] w-[400px] flex flex-col items-center justify-center max-sm:w-[212px] cursor-pointer'>
                      <p className='text-white font-mulish text-[22px] text-center text-opacity-66 '><span className='text-success-511 underline'>Upload</span> Collection here</p>
                    </div>
                  </div>
                </label>

              </div>

            </div>

            <div className=''>
              <input required type='file' name='nftFile' className='hidden' multiple id='nftFile' accept=".png,.jpeg,.jpg,.gif" />
              <div className='flex max-lg:flex-col justify-between max-lg:gap-10  max-lg:justify-center max-lg:items-center'>
                <label htmlFor="nftFile" className='w-fit h-fit'>
                  <div className='flex justify-between'>
                    <div className='  border-2 border-dashed px-14 max-sm:px-5 border-success-529 h-[212px] w-[400px] flex flex-col items-center justify-center max-sm:w-[212px] cursor-pointer'>
                      <p className='text-white font-mulish text-[22px] text-center text-opacity-66 '><span className='text-success-511 underline'>Upload</span> All Nfts here</p>
                    </div>
                  </div>
                </label>

              </div>

            </div>

            <div className=''>
              <input required type='file' name='nftMetaData' className='hidden' id='nftMetaData' accept=".json" />
              <div className='flex max-lg:flex-col justify-between max-lg:gap-10  max-lg:justify-center max-lg:items-center'>
                <label htmlFor="nftMetaData" className='w-fit h-fit'>
                  <div className='flex justify-between'>
                    <div className='  border-2 border-dashed px-14 max-sm:px-5 border-success-529 h-[212px] w-[400px] flex flex-col items-center justify-center max-sm:w-[212px] cursor-pointer'>
                      <p className='text-white font-mulish text-[22px] text-center text-opacity-66 '><span className='text-success-511 underline'>Upload</span> Metadata here</p>
                    </div>
                  </div>
                </label>

              </div>

            </div>

          </div>
          <div className='flex justify-end items-center mt-3'>
            <button type='submit' className='text-white bg-success-508 px-4 rounded-xl py-2'>Mint Entire Colleciton</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NftMinting