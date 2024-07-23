'use server'
import db from "@/db";
// import fs from 'fs/promises';
// import path from 'path';
// import { Readable } from 'stream';
// import { pipeline } from 'stream/promises'; 
// import { randomBytes } from 'crypto';
import cloudinary from "@/lib/cloudinary";
import { uploadImage } from "@/lib/uploadToCloud";
import { revalidatePath } from 'next/cache'
// import formidable from 'formidable';



type uploadNFtTyp = { success: boolean } | { error: string } | { id: any };
export const uploadNftAction = async (formdata: FormData | null , nftImageUrl : string , idOfNft : number, address : string, collection : string): Promise<uploadNFtTyp> => {
    try {
        // console.log(formdata)
        if (formdata == null) {
            console.log('formdata null ')
            return { error: "Invalid/Missing data" };
        }
        const nftFile = formdata.get('nftFile') as File;
        const name = formdata.get('name') as string;
        const price = parseFloat(formdata.get('price') as string);
        const collectionId = parseInt(formdata.get('collection') as string);
        const royalties = parseFloat(formdata.get('royalties') as string);
        const description = formdata.get('description') as string;
        // if (!Number.isFinite(price) || isNaN(price)) {
        //     return { error: "Invalid price format" };
        //   }
      
        //   if (!Number.isFinite(royalties) || isNaN(royalties)) {
        //     return { error: "Invalid royalties format" };
        //   }
        if(!nftFile || !name || !price || !collection || !royalties){
            console.log('in here in the insufficent data proveded clause')
            return {error : "Please fill in all the details"}
        }
        // const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        // const randomString = randomBytes(8).toString('hex');
        // const fileName = `${Date.now()}_${randomString}_${nftFile.name}`;
        // const filePath = path.join(uploadsDir, fileName);

        // if (!fs.existsSync(uploadsDir)) {
        //     fs.mkdirSync(uploadsDir, { recursive: true });
        // }

        // const readableStream = Readable.fromWeb(nftFile.stream() as any);

        // const fileStream = fs.createWriteStream(filePath);
        //  pipeline(readableStream, fileStream);
        // const data1 = await nftFile.arrayBuffer();
        // const currentDirectory = process.cwd();
        //     console.log(currentDirectory);
        // await fs.writeFileSync(`${process.cwd()}/public/uploads/${fileName}` , Buffer.from(data1));
        
        // const filePath = path.resolve('public/uploads', fileName);
        // fs.writeFileSync(filePath, Buffer.from(data1));
        // const nftImageUrl = `/uploads/${fileName}`;

        // const filePath = path.join('/' , 'tmp' , fileName);
        // await fs.writeFile(filePath ,Buffer.from(data1));
        // const nftImageUrl = filePath;
        // const fileReader = new FileReader();
        
        // const filePromise = new Promise<string>((resolve, reject) => {
        //     fileReader.onloadend = () => resolve(fileReader.result as string);
        //     fileReader.onerror = () => reject(fileReader.error);
        //     fileReader.readAsDataURL(nftFile);
        // });
        // const fileBase64 = await filePromise;

        // const form = new formidable.IncomingForm();

      //   const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
      //     folder: 'uploads',
      // });
      // const buffer = await nftFile.arrayBuffer();
      // const bytes  = Buffer.from(buffer);
      // const res = await cloudinary.uploader.upload_stream({
      //   resource_type : 'auto',
      //   folder : 'uploads',

      // }).end(bytes);
      // const res : any = await uploadImage(nftFile , 'uploads');
      // console.log(res)
      // const nftImageUrl = res?.secure_url;
      // const nftImageUrl = 'bacd'
        const nft = await db.nft.create({
            data: {
              id : idOfNft,
              nft_name: name,
              nft_price: price,
              nft_image: nftImageUrl,
              nft_collection_name: collection,
              nft_collection_id: collectionId,
              nft_royalties: royalties,
              nft_description: description,
              nft_owner_address: address, 
              nft_creator_address: address, 
              nft_mint_time: new Date(),
              is_admin_minted: false,
              nft_liked: 0,
              is_insured: false,
            },
            select: {
              id: true,
            },
          });
          revalidatePath('/api/nfts');
          return { success: true, id: nft.id };
    } catch (error) {
        console.log('in here in the error clause at line 68');
        console.log(error);
        return { error: 'Error occured' }
    }
}


export const getNftWithIdAction = async(nftId : string)=>{
  try{
    const record = await db.nft.findUnique({
      where : {id : parseInt(nftId)}
    })
    return {record}
  }catch(error){
    throw new Error("Could not fetch nft");
  }
}

export const getCollecitonOfUserWithAddress = async(address : String)=>{
  try{
    const collections = await db.collection.findMany({
      where : {ownerAddress : address as string},
      select : {
        id : true,
        name : true, 
        image : true
      }
    })
    revalidatePath('/create-nft/upload')
    return collections;
  }catch(error){
    console.error("Error fetching collections: ", error);
    throw new Error("Could not fetch collections");
  }
}

// export const uploadImageOnly = async(formdata: FormData , folder : string) : Promise<string>=>{
//   const res : any = await uploadImage(imgFile , 'uploads');
//       console.log(res)
//       const nftImageUrl = res?.secure_url;
//       return nftImageUrl
// }

type uploadCollecitonType = {success : boolean} | {error : string}
export const uploadCollection = async(formData : FormData, collectionId : number, address : string) : Promise<uploadCollecitonType> =>{
  try{
      if(!formData.get("name") || !formData.get("collectionFile") || !formData.get("description") || !formData.get("floorPrice") || !collectionId){
        console.log("in here in the rror")
        return {error : "Missing Values"}
      }
    //  const collectionFile = formData.get("collectionFile") as File;
     const cloudUpload = await uploadImage(formData , 'collectionUploads' , 'collectionFile');
     const nameOfCollection = formData.get("name") as string;
     const description = formData.get("description") as string;
     const floorPrice = parseFloat(formData.get('floorPrice') as string);
     const collectionUpl = await db.collection.create({
      data : {
        id : collectionId,
        image : cloudUpload.secure_url,
        name : nameOfCollection,
        ownerAddress : address,
        price : floorPrice,
        creationTime : new Date(),
      }
     })
    //  revalidatePath('/create-nft/upload');
      return {success : true}
  }catch(error){
    console.log(`errror uploading collleciotn ${JSON.stringify(error)}`)
    // throw new Error("Could not fetch collections");
    return {error : JSON.stringify(error)}
  }
}

type createProfileWhenWalletConnectType = {success : boolean}
export const createProfileWhenWalletConnect = async(address : string) : Promise<createProfileWhenWalletConnectType>=>{
  try{
    console.log("in here in the create profile when the wallet is connected is function")
    const existingUser = await db.
    user.findUnique({
      where : {
        walletAddress : address
      }
    });
    if(!existingUser){
      await db.user.create({
        data : {
          walletAddress : address
        }
      })
    }
    return {success : true}
  }catch(error){
    console.log(error);
    console.log('error creating database entry')
    // throw new Error('Error creating database entry');
    return {success : false}
  }
}

// export const getUserDetails = async(address : string)=>{
//   try{
//     console.log('in here in the action of get user details')
//     const user = await db.user.findUnique({
//       where : {
//         walletAddress : address
//       },
//     });
//     if(!user){
//       return null;
//     }
//     return user;

//   }catch(error){
//     throw new Error('error getting details from database');
//   }
// }
type upsertUserProfileType = {success : string}
export const upsertUserProfile = async (formData: FormData): Promise<upsertUserProfileType> => {
  try {
    const walletAddress = formData.get('walletAddress') as string;
    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }
    const address = formData.get('address') as string | undefined;
    const bio = formData.get('bio') as string | undefined;
    const number = formData.get('number') as string | undefined;
    const email = formData.get('email') as string | undefined;
    const name = formData.get('name') as string | undefined;

    let imgUrl: string | undefined;

    const imgSrcFile = formData.get('imgSrc') as File;
    if (imgSrcFile && imgSrcFile.size > 0) {
      // console.log(formData.get('imgSrc'))
      const uplImg = await uploadImage(formData, 'users', 'imgSrc');
      imgUrl = uplImg.secure_url;
    }

    // key !== 'imgSrc'
    const formObject: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      if (typeof(value) == 'string') {
        formObject[key] = value;
      }
    });
    
    
    if (imgUrl) {
      formObject.imgSrc = imgUrl;
    }
    
    
    console.log(formObject)
    const data: { [key: string]: any } = { ...formObject };

   
    const existingUser = await db.user.findUnique({
      where: { walletAddress },
    });

    if (existingUser) {
      
      await db.user.update({
        where: { walletAddress },
        data,
      });
      return { success: 'Profile Updated Successfully' };
    } else {
     
      await db.user.create({
        data: {
          walletAddress,
          imgSrc: imgUrl,
          name,
          address,
          bio,
          email,
          number,
        },
      });
      return { success: 'Profile Created Successfully' };
    }
  } catch (error) {
    console.error('Error editing profile:', error);
    throw new Error('Error editing profile, please try again');
  }
};