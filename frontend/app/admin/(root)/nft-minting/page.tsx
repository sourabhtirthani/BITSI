'use client'
import { uploadCollection, uploadNftAction } from '@/actions/uploadNft';
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel';
import Dropdown from '@/components/Dropdown'
import { nftMintingDropDown } from '@/constants';
import { generateMetadata } from '@/lib/generateMetadata';
import { uploadImage } from '@/lib/uploadToCloud';
import { generateRandomTokenId } from '@/lib/utils';
import { AdminWalletMintProps, DataOfNFtJsonAdmin } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useAccount, useWriteContract, useBalance } from 'wagmi';
import { useToast } from "@/components/ui/use-toast"
import { contractABI, contractAddress } from '@/lib/contract';
import { AdminDialogImagesBulkNotUploaded } from '@/components/AdminDialogImagesBulkNotUploaded';
import { getTransactionFromHash } from '@/lib/getTransactionFromHash';
import { DropDownAdminWalletList } from '@/components/DropDownAdminWalletList';


const NftMinting = () => {
  const [wallet, setWallet] = useState('');
  const [loaderSubmitBulkUploadForm , setLoaderSubmitBulkUploadForm] = useState(false);
  const { toast } = useToast()
  const { writeContractAsync } = useWriteContract();
  const [numberOfNFtFiles, setNumberOfNftFiles] = useState(0);
  const { address, isConnected } = useAccount();
  const { data: balance} = useBalance({address : address});
  const [collectionFilePreview, setCollectionFilePreview] = useState('/icons/default-nft-preview.png');
  const [allNftWallets , setAllNftWallets] = useState<AdminWalletMintProps[]>([])
  const [numberOfNftsUploaded , setNumberOfNftsUploaded] = useState<number>(0);
  const [jsonFileUplaoded , setJsonFileUploaded] = useState(false);
  let tokenIds: number[] = [];
  let metadataArray: any[] = [];
  let nftImagesUrl: string[] = [];
  let nftNamesArray : string[] = [];
  let nftDescriptionArr : string[] = [];
  const [lengthOfNotUploadedNfts, setLengthOfNotUploadedNfts] = useState(0)
  let nftsNotUploaded : string[] = [];
  const [notUploaded, setNotUploaded] = useState<string[]>([]);

  useEffect(()=>{
    const getAllMintWallets = async()=>{
      try{
        const res = await fetch(`/api/admin/wallet-management/mint-wallets`, { method: "GET", next: { revalidate: 0 }})
        const resInJson = await res.json();
        setAllNftWallets(resInJson);
      }catch(error){
        console.log(`error fetching all the mint wallets`);
        console.log(error)
      }
    }
    getAllMintWallets();
  }, [])

  const handleNFtBulkUplaodChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const filePre = new FileReader;
    const number = event.target.files?.length;
    if(number !=null){
    setNumberOfNftFiles(number);
    }else{
      setNumberOfNftFiles(0);
    }
  }

  const handleMetadataUploadChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const filePre = new FileReader;
    const file = event.target.files?.[0];
    if(file){
      setJsonFileUploaded(true);
    }else{
      setJsonFileUploaded(false);
    }
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filePre = new FileReader;
    const file = event.target.files?.[0];

    if (file) {
      const fileReader = new FileReader();
      const imgURL = URL.createObjectURL(file);  // one way to preview image
      setCollectionFilePreview(imgURL)
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {  // second way to preview image..both preview and previewTemp holds the preview of the image
          setCollectionFilePreview(fileReader.result);
        }
      };

      fileReader.readAsDataURL(file); // Read the file as a data URL
    }else{
      setCollectionFilePreview('/icons/default-nft-preview.png');
    }

   

  }



  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setLoaderSubmitBulkUploadForm(true);
      if(!address){
        console.log("no wallets connected")
        toast({title: "Wallet Not Connected", description: "Please connect wallet in order to proceed.",duration: 2000,
          style: {backgroundColor: '#900808', color: 'white',fontFamily: 'Manrope',
          },
        })
        return;
      }
      const stringAddress: string = address;
      const collectionName = event.currentTarget.elements.namedItem('collectionName') as HTMLInputElement;
      const jsonInput = event.currentTarget.elements.namedItem('nftMetaData') as HTMLInputElement;
      const collectionPrice = event.currentTarget.elements.namedItem('price') as HTMLInputElement;
      const collectionDescription = event.currentTarget.elements.namedItem('collectionDescription') as HTMLInputElement;
      const collectionImg = event.currentTarget.elements.namedItem('collectionFile') as HTMLInputElement;
      const allNftImages = event.currentTarget.elements.namedItem('nftFile') as HTMLInputElement;
      if (!jsonInput || !collectionPrice || !collectionDescription || !collectionImg || !collectionImg.files || !allNftImages || !collectionName || !jsonInput.files || !allNftImages.files) {
        
        throw new Error('Invalid Details')
      }
      if(wallet == ''){
        toast({title: "PLEASE SELECT WALLET", description: "Please select the wallet where you want the nfts to be minted at",duration: 2000,style: {backgroundColor: '#900808', color: 'white',fontFamily: 'Manrope',},});
        throw new Error('error')
      }
      const priceInWeiOfCollection = Number(Math.floor(parseFloat(collectionPrice.value) * 10 ** 18));
      const idOfCollection = generateRandomTokenId();
      const transaction = await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: 'mintCollection',
        args: [idOfCollection, priceInWeiOfCollection],
      });
      // console.log(collectionPrice.value)
      // const transaction = true;
      if (transaction) {
        const getRes = await getTransactionFromHash(transaction);
        // if(getRes.success == true){

        const formData = new FormData();
        formData.append("name", collectionName.value as string);
        formData.append("collectionFile", collectionImg.files[0]);
        formData.append("description", collectionDescription.value);
        formData.append("floorPrice", collectionPrice.value);
        const res = await uploadCollection(formData , idOfCollection , wallet);

        if (jsonInput.files && jsonInput.files[0]) {
          const file = jsonInput.files[0];
          // console.log(file)
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
                  
                
                  if (jsonMap.has(nftFileName)) {
                    try {
                      const matchingJson = jsonMap.get(nftFileName);
                      
                      const formDataNft = new FormData();
                      formDataNft.append("nftFile", allNftImages.files[j])
                      const nftImageUrl = await uploadImage(formDataNft, 'uploads', 'nftFile', true); 
                      if (nftImageUrl.secure_url == '' || !nftImageUrl.secure_url) {
                        throw new Error('NO image url is returned')
                      } 
                     
                      
                      const { tokenId, tokenURI } = await generateMetadata(stringAddress, matchingJson?.name ?? '', matchingJson?.description ?? '', nftImageUrl.secure_url)
                    
                     
                      if(!tokenId || !tokenURI){
                        throw new Error('no Token URI found')
                      }
                    tokenIds.push(tokenId);
                   metadataArray.push(tokenURI);
                    nftImagesUrl.push(nftImageUrl.secure_url);
                     nftNamesArray.push(jsonMap.get(nftFileName)?.name ?? '');
                     nftDescriptionArr.push(jsonMap.get(nftFileName)?.description ?? '')
                    } catch (error) {
                       setNotUploaded(prev => [...prev, nftFileName]);
                    }
                  } else {
                    console.log(`No match found for ${nftFileName}`);
                    setLengthOfNotUploadedNfts(prevCount => prevCount + 1)
                    nftsNotUploaded.push(nftFileName)
                   setNotUploaded(prev => [...prev, nftFileName]);
                  }
                  
                }
                // console.log(`the meta data aray is`);
                // console.log(metadataArray);
                const transactionOfNft = await writeContractAsync({
                  address: contractAddress,
                  abi: contractABI,
                  functionName: 'mintBulk',
                  args: [wallet , idOfCollection, metadataArray , tokenIds ],
                });
                  // const transactionOfNft = true;
                if(transactionOfNft){
                  const resOfTransationNFt = await getTransactionFromHash(transactionOfNft);
                 
                  console.log(tokenIds.length == metadataArray.length);
                  // console.log(metadataArray)
                  console.log(`the length of the token id : ${tokenIds.length}`)
                    for(let i = 0; i< tokenIds.length; i++){
                      console.log(`the token id is : $${tokenIds[i]} , the name is : ${nftNamesArray[i]} 
                        the description is : ${nftDescriptionArr[i]} `)
                        const formDataForUploadNft = new FormData();
                        formDataForUploadNft.append("name", nftNamesArray[i]);
                        formDataForUploadNft.append("price", collectionPrice.value as string);
                        formDataForUploadNft.append("collection", idOfCollection as unknown as string );
                        formDataForUploadNft.append("collection", collectionName.value);
                        formDataForUploadNft.append("description", nftDescriptionArr[i]);
                        const res = await uploadNftAction(formDataForUploadNft,nftImagesUrl[i],tokenIds[i],wallet, collectionName.value)
                        if('error' in res && res.error){
                        setLengthOfNotUploadedNfts(prevCount => prevCount + 1)
                          // nftsNotUploaded.push(nftNamesArray[i])
                          setNotUploaded(prev => [...prev, nftNamesArray[i]]);
                        }
                      }
                      toast({
                        title: "Operation Success",
                        description: "Opereation succesfull.",
                        duration: 2000,
                        style: {
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          fontFamily: 'Manrope',
                        },
                      });
                }else{
                  // collection minted but nft transaction is cancelled
                  setLoaderSubmitBulkUploadForm(false);
                }
              }
              setLoaderSubmitBulkUploadForm(false);
            } catch (error) {
              console.error("Error parsing JSON file:", error);
              toast({ title: "Transaction failed", description: "ERROR", duration: 2000,
                style: { backgroundColor: '#900808', color: 'white',fontFamily: 'Manrope',
                },
              })
              setLoaderSubmitBulkUploadForm(false);
            }
          };

          reader.readAsText(file);
        } else {
          console.error("No file selected");
          setLoaderSubmitBulkUploadForm(false);
        }
      // }
      }else{
        toast({
          title: "Transaction failed",
          description: "Please approve transaction in order to mint the nfts",
          duration: 2000,
          style: {
            backgroundColor: '#900808',
            color: 'white',
            fontFamily: 'Manrope',
          },
        })
      }

    } catch (error) {
      console.log('in the error caluse')
      console.log(error)
      setLoaderSubmitBulkUploadForm(false);
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
        {/* <Dropdown items={nftMintingDropDown} showIcon={false} buttonName='Select Your Wallet' arrowImage='/icons/arrow-dropdown.svg' setValue={setWallet} /> */}
        <DropDownAdminWalletList selectedOption={wallet} setSelectedOption={setWallet} allData={allNftWallets} />
        {/* <button className='bg-success-511 px-28 mt-8 self-end py-2 text-white font-bold text-[20px] w-fit rounded-3xl'>Mint</button> */}
      </div>
      <div>
        <p className='font-bold text-[22px] font-manrope text-white mb-14 mt-20'>Upload Collection Image and select all the Nft images</p>
        <form onSubmit={handleFormSubmit}>
          <div className='flex w-full max-md:flex-col gap-3 flex-wrap'>

            <div className='flex justify-between max-xl:flex-col w-full gap-4'>
              <div className='flex flex-col w-1/3 max-xl:w-full'>
                <label htmlFor='price' className='font-montserrat mt-2 mb-2 text-white text-[22px] font-semibold '>Collection Price</label>
                <div className='w-full flex relative'>
                <input placeholder='Collection Price' id='price' name='price' required type='number' step='0.0001' min='0' className='p-3 no-spinners w-full rounded' />
                <hr  className='border-2 end-14 border-black h-full absolute text-black'/>
                <div className='text-black absolute bg end-1 top-1.5  text-[24px] font-bold '>{balance?.symbol ? balance?.symbol : 'N/A'}</div></div>
                </div>

              <div className='flex flex-col w-1/3 max-xl:w-full'>
                <label htmlFor='collectionName' className='font-montserrat mt-2 mb-2 text-white text-[22px] font-semibold '>Collection Name</label>
                <input placeholder='Collection Name' id='collectionName' name='collectionName' required type='text' className='p-3  w-full rounded' /></div>
              <div className='flex flex-col  w-1/3 max-xl:w-full'>
                <label htmlFor='collectionDescription' className='font-montserrat mt-2 mb-2 text-white text-[22px] font-semibold '>Collection description</label>
                <input placeholder='Collection Description' id='collectionDescription' name='collectionDescription' type='text' className='p-3 no-spinners w-full rounded' /></div>
            </div>
            <div className='flex flex-col'>
              <input required type='file' name='collectionFile' onChange={handleOnChange} className='hidden' id='collectionFile' accept=".jpg,.png,.svg,.gif,.jpeg" />
              <div className='flex max-lg:flex-col relative justify-between max-lg:gap-10  max-lg:justify-center max-lg:items-center'>
                <label htmlFor="collectionFile" className='w-fit h-fit'>
                  <div className='flex justify-between'>
                    <div className='  border-2 border-dashed px-14 max-sm:px-5 border-success-529 h-[212px] w-[400px] flex flex-col items-center justify-center max-sm:w-[212px] cursor-pointer'>
                      <p className='text-white font-mulish text-[22px] text-center text-opacity-66 '><span className='text-success-511 underline'>Upload</span> Collection Image here</p>
                      <Image src={collectionFilePreview} height={110} width={110} alt='colleciton previre image'  className='absolute end-2 bottom-2 right-1 max-h-[110px] max-w-[110px]'/>
                    </div>
                  </div>
                </label>

              </div>

            </div>

            <div className=''>
              <input onChange={handleNFtBulkUplaodChange} required type='file' name='nftFile' className='hidden' multiple id='nftFile' accept=".png,.jpeg,.jpg,.gif" />
              <div className='flex max-lg:flex-col  justify-between max-lg:gap-10  max-lg:justify-center max-lg:items-center'>
                <label htmlFor="nftFile" className='w-fit h-fit'>
                  <div className='flex  justify-between'>
                    <div className='  border-2 relative border-dashed px-14 max-sm:px-5 border-success-529 h-[212px] w-[400px] flex flex-col items-center justify-center max-sm:w-[212px] cursor-pointer'>
                      <p className='text-white font-mulish text-[22px] text-center text-opacity-66 '><span className='text-success-511 underline'>Upload</span> All Nft Images here</p>
                      <p className='absolute self-center bottom-0 text-white text-[14px] font-bold font-montserrat'>{numberOfNFtFiles} images selected</p>
                    </div>
                  </div>
                </label>

              </div>

            </div>

            <div className=''>
              <input onChange={handleMetadataUploadChange} required type='file' name='nftMetaData' className='hidden' id='nftMetaData' accept=".json" />
              <div className='flex max-lg:flex-col  justify-between max-lg:gap-10  max-lg:justify-center max-lg:items-center'>
                <label htmlFor="nftMetaData" className='w-fit h-fit'>
                  <div className='flex justify-between relative'>
                    <div className='  border-2 border-dashed px-14 max-sm:px-5 border-success-529 h-[212px] w-[400px] flex flex-col items-center justify-center max-sm:w-[212px] cursor-pointer'>
                      <p className='text-white font-mulish text-[22px] text-center text-opacity-66 '><span className='text-success-511 underline'>Upload</span> Metadata here</p>
                      <p className='absolute self-center bottom-0 text-white text-[14px] font-bold font-montserrat'>{jsonFileUplaoded ? <span className='text-success-531'>File Uploaded</span> : <span className='text-success-530'>No files selected</span> }</p>
                    </div>
                  </div>
                </label>

              </div>

            </div>

          </div>
          <div className='flex justify-end items-center mt-3 '>
            {loaderSubmitBulkUploadForm == true ? <div role="status" className='bg-slate-500 px-14 rounded-xl py-1.5'>
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin  dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div> :  
        <>   
        {isConnected ? 
          <button type='submit' className='text-white font-bold bg-success-508 px-4 rounded-xl py-2'>Mint Entire Colleciton</button> : <button disabled className='text-black font-bold bg-gray-500 px-4 rounded-xl py-2'>Mint Entire Collection</button>}
        </> 
        }
          </div>
        </form>
      </div>

      {lengthOfNotUploadedNfts > 0 && <div>
        <p className='text-white font-montserrat'>Some of the images were not uploaded</p>  
        <AdminDialogImagesBulkNotUploaded arrayOfNotUplaodedImageName={notUploaded} />
        </div>}
    </div>
  )
}

export default NftMinting