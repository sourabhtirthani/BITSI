'use server'
import db from "@/db";
// import fs from 'fs/promises';
// import path from 'path';
// import { Readable } from 'stream';
// import { pipeline } from 'stream/promises'; 
// import { randomBytes } from 'crypto';
import { sendClaimAcceptRejectEmail } from "@/lib/sendEmails";
import { uploadImage } from "@/lib/uploadToCloud";
import { revalidatePath } from 'next/cache'
import { hash, compare } from 'bcryptjs'
import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth';
import { CompensationParams } from "@/types";
import { readInsuranceContractParamentes } from "@/lib/contractRead";
// import formidable from 'formidable';
//line 890 recheck

//MUST READ
// this is the place where all the server actions are written.  

type uploadNFtTyp = { success: boolean } | { error: string } | { id: any };
export const uploadNftAction = async (formdata: FormData | null, nftImageUrl: string, idOfNft: number, address: string, collection: string): Promise<uploadNFtTyp> => {
  try {
    // console.log(formdata)
    if (formdata == null) {
      console.log('formdata null ')
      return { error: "Invalid/Missing data" };
    }
    // const nftFile = formdata.get('nftFile') as File;
    const name = formdata.get('name') as string;
    const price = parseFloat(formdata.get('price') as string);
    const collectionId = parseInt(formdata.get('collection') as string);
    // const royalties = parseFloat(formdata.get('royalties') as string);
    const description = formdata.get('description') as string;
    if (!name || !price || !collectionId) {
      console.log('in here in the insufficent data proveded clause')
      return { error: "Please fill in all the details" }
    }
    let adminMinted: boolean = false;
    const adminWalletAddress = await readInsuranceContractParamentes('owner');
    if (address == adminWalletAddress) {
      adminMinted = true;
    }
    // }).end(bytes);
    const dateOfNft = new Date();
    const nft = await db.nft.create({
      data: {
        id: idOfNft,
        nft_name: name,
        nft_price: price,
        nft_image: nftImageUrl,
        nft_collection_name: collection,
        nft_collection_id: collectionId,
        nft_description: description,
        nft_owner_address: address,
        nft_creator_address: address,
        nft_mint_time: dateOfNft,
        is_admin_minted: adminMinted,
        nft_liked: 0,
        is_insured: true,
      },
      select: {
        id: true,
      },
    });
    await db.nft_events.create({
      data: {
        from: address,
        nft_event: 'mint',
        nft_price: price,
        time: dateOfNft,
        to: address,
        nftId: nft.id,
        asset_name: 'NFT'


      }
    })
    const expirationDate = new Date(dateOfNft);
    expirationDate.setFullYear(dateOfNft.getFullYear() + 2);
    await db.insurance.create({
      data: {
        active: true,
        approved: false,
        startTime: dateOfNft,
        expiration: expirationDate,
        nftId: idOfNft,
        currentOwner: address,
        coverage : price,
      }
    })
    revalidatePath('/api/nfts');
    return { success: true, id: nft.id };
  } catch (error) {
    console.log('in here in the error clause at line 68');
    console.log(error);
    return { error: 'Error occured' }
  }
}


export const getNftWithIdAction = async (nftId: string) => {
  try {
    const record = await db.nft.findUnique({
      where: { id: parseInt(nftId) }
    })
    return { record }
  } catch (error) {
    throw new Error("Could not fetch nft");
  }
}

export const getCollecitonOfUserWithAddress = async (address: String) => {
  try {
    const collections = await db.collection.findMany({
      where: { ownerAddress: address as string },
      select: {
        id: true,
        name: true,
        image: true
      }
    })
    revalidatePath('/create-nft/upload')
    return collections;
  } catch (error) {
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

type uploadCollecitonType = { success: boolean } | { error: string }
export const uploadCollection = async (formData: FormData, collectionId: number, address: string): Promise<uploadCollecitonType> => {
  try {
    if (!formData.get("name") || !formData.get("collectionFile") || !formData.get("description") || !formData.get("floorPrice") || !collectionId) {
      console.log("in here in the rror")
      return { error: "Missing Values" }
    }
    //  const collectionFile = formData.get("collectionFile") as File;
    const cloudUpload = await uploadImage(formData, 'collectionUploads', 'collectionFile');
    const nameOfCollection = formData.get("name") as string;
    const description = formData.get("description") as string;
    const floorPrice = parseFloat(formData.get('floorPrice') as string);
    const collectionUpl = await db.collection.create({
      data: {
        id: collectionId,
        image: cloudUpload.secure_url,
        name: nameOfCollection,
        ownerAddress: address,
        price: floorPrice,
        creationTime: new Date(),
      }
    })
    //  revalidatePath('/create-nft/upload');
    return { success: true }
  } catch (error) {
    console.log(`errror uploading collleciotn `)
    console.log(error)
    // throw new Error("Could not fetch collections");
    return { error: JSON.stringify(error) }
  }
}

type createProfileWhenWalletConnectType = { success: boolean }
export const createProfileWhenWalletConnect = async (address: string): Promise<createProfileWhenWalletConnectType> => {
  try {
    console.log("in here in the create profile when the wallet is connected is function")
    const existingUser = await db.
      user.findUnique({
        where: {
          walletAddress: address
        }
      });
    if (!existingUser) {
      await db.user.create({
        data: {
          walletAddress: address
        }
      })
    }
    return { success: true }
  } catch (error) {
    console.log(error);
    console.log('error creating database entry')
    // throw new Error('Error creating database entry');
    return { success: false }
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
type upsertUserProfileType = { success: string }
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
      if (typeof (value) == 'string') {
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


type buyNFtType = { success: boolean }
export const buyNft = async (address: string, nftId: number[]): Promise<buyNFtType> => {
  try {
    // const findNft = await db.nft.findMany({
    //   where : {id : { in :nftId} }
    // });
    // if(!findNft){
    //   throw new Error('NO NFts Found');
    // }else{
    //   const notForSaleOrOwned = findNft.find(nft => !nft.up_for_sale || nft.nft_owner_address === address);
    //   if(notForSaleOrOwned){
    //     throw new Error("NFt thaat you are trying to buy is eitheralready sold or not for sale.");
    //   }else{
    //     for (const nft of findNft) {
    //       const previousOwner = nft.nft_owner_address;
    //       const nftPrice = nft.nft_price
    //       await db.nft.update({
    //         where: { id: nft.id },
    //         data: { nft_owner_address: address, up_for_sale : false }
    //       });

    //       await db.nft_events.create({
    //         data: {
    //           nft_event: 'buy',
    //           nft_price: nftPrice,
    //           from: previousOwner,
    //           to: address,
    //           time: new Date(),
    //           nftId: nft.id
    //         }
    //       });

    //     }
    //     revalidatePath('/bitsi-nft')
    //     revalidatePath('/my-profile')
    //     return {success : true}
    //   }
    // }

    revalidatePath('/bitsi-nft')
    revalidatePath('/my-profile')
    return { success: true }
  } catch (error) {
    console.log(error);
    throw new Error('Error Buying Nfts')
  }
}


export const getMultipleNftsWithIds = async (nftLst: string[]) => {
  try {
    let idOfNftsArr: number[] = [];
    for (let i = 0; i < nftLst.length; i++) {
      idOfNftsArr.push(Number(nftLst[i]));
    }
    const allSelectedNfts = await db.nft.findMany({
      where: { id: { in: idOfNftsArr } },
      select: {
        id: true,
        nft_name: true,
        nft_price: true,
        nft_image: true,
        nft_collection_name: true,
        nft_collection_id: true,
        // nft_royalties: true,
        nft_description: true,
        nft_owner_address: true,
        up_for_sale: true
      }
    });
    if (!allSelectedNfts) {
      return null;
    }
    return allSelectedNfts;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting details of NFT')
  }
}

export const getNFtsOfUser = async (address: string) => {
  try {
    if (!address) {
      throw new Error('NO address Provided');
    }
    const allNfts = await db.nft.findMany({
      where: { nft_owner_address: address },
      select: {
        nft_name: true,
        nft_collection_name: true,
        collection: {
          select: {
            image: true
          }
        },
        nft_image: true
      }
    })
    return allNfts;
  } catch (error) {
    console.log(error)
    // throw new Error('error')
    return;

  }
}

type nftData = {
  id: number,
  nft_name: string,
  nft_price: number,
  nft_image: string,
  nft_collection_name: string
  nft_mint_time: Date
  nft_owner_address: string;
  collection: {
    image: string;
  };
}
export const getAllNfts = async (): Promise<nftData[]> => {
  try {
    const nfts = await db.nft.findMany({
      where: {
        up_for_sale: true,
        is_admin_minted: true,
      },
      select: {
        id: true,
        nft_name: true,
        nft_price: true,
        nft_image: true,
        // nft_collection_id : true,
        nft_collection_name: true,
        nft_mint_time: true,
        nft_owner_address: true,
        collection: {
          select: {
            image: true
          }
        }
      },
    });
    // revalidatePath('/bitsi-nft')
    //  return new NextResponse(JSON.stringify({ nfts }), {
    //   status: 200,
    //   headers: {
    //     'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    //     'Pragma': 'no-cache',
    //     'Expires': '0',
    //     'Surrogate-Control': 'no-store',
    //   },
    // });
    return nfts
  } catch (error) {
    throw new Error('error gettig=ng nfts')
  }

}

// type GetUserEventsType = {
//   id: number;
//   nft_event: string;
//   nft_price: number;
//   from: string;
//   to: string;
//   time: Date;
//   nftId: number;
// }
// export const getUserEvents = async(address : string) : Promise<GetUserEventsType[] | null>=>{
//   try{
//     const events = await db.nft_events.findMany({
//       where : {
//           to :{
//             equals: address
//           }
//       },
//   })

//     return events;

//   }catch(error){
//     throw new Error('error in user events')
//   }
// }

type generateCompensationType = { success: boolean } | { error: string }
export const generateCompensation = async (formdata: FormData): Promise<generateCompensationType> => {  // function not used anymore
  try {
    const nftId = formdata.get('nftId') as string;
    const userAddress = formdata.get('address') as string;
    const eventId = formdata.get('eventId') as string;
    const soldValue = formdata.get('soldValue') as string;

    if (!userAddress || !nftId || !eventId) {
      return { error: 'Insufficient details provided' }
    }
    const insuranceOfAsset = await db.insurance.findUnique({
      where: { nftId: Number(nftId) },
      select: {
        id: true,
        expiration: true
      }
    });
    if (!insuranceOfAsset) {
      return { error: 'Asset Not Insured' };
    }
    const currentDate = new Date();
    if (new Date(insuranceOfAsset.expiration) < currentDate) {
      return { error: "Insurance has Expired" };
    }
    const checkForCompensationAlreadtClaimed = await db.compensation.findFirst({
      where: {
        userAdress: userAddress,
        assetId: Number(nftId),
        insuranceId: insuranceOfAsset.id
      },
      select: {
        Status: true,
        id: true
      }
    });
    if (checkForCompensationAlreadtClaimed) {
      if (checkForCompensationAlreadtClaimed.Status == 'Pending') {
        return { error: 'Please wait for the claim to be approved' };
      } else {
        return { error: 'You cannot claim compensation for asset twice' };
      }
    }
    const latestBuyEvent = await db.nft_events.findFirst({
      where: {
        nft_event: 'buy',
        to: userAddress,
        nftId: Number(nftId)
      },
      orderBy: {
        time: 'desc',
      },   // check here
    });

    if (!latestBuyEvent) {
      console.log("no latest event found");
      return { error: 'Unable to fetch the details of when you bought the nft' };
    }
    const soldEvent = await db.nft_events.findUnique({
      where: {
        id: Number(eventId)
      }
    })
    if (!soldEvent) {
      console.log('no event found')
      return { error: 'unable to fetch the details of the sold event' };
    }
    console.log(latestBuyEvent.nft_price - soldEvent.nft_price);
    const lossAmount = (latestBuyEvent.nft_price - soldEvent.nft_price);
    if (latestBuyEvent.nft_price - soldEvent.nft_price < 0) {
      return { error: 'Cannot claim compensation when there is no loss' }
    }
    const lossAmountWithoutFixed = latestBuyEvent.nft_price - soldEvent.nft_price;
    const lossPercentage = Number((((latestBuyEvent.nft_price - soldEvent.nft_price) / latestBuyEvent.nft_price) * 100).toFixed(2));
    if (lossPercentage < 10) {
      return { error: 'Cannot Claim compensation when loss percent is less than 10' }
    }
    console.log(`loss percenteage is : ${lossPercentage}`)
    const eightyPercentOfLoss = Number((lossAmountWithoutFixed * 0.80).toFixed(4));
    await db.compensation.create({
      data: {
        loss: lossAmount,
        assetId: Number(nftId),
        lossPercent: lossPercentage,
        compensationAmount: eightyPercentOfLoss,
        userAdress: userAddress,
        insuranceId: insuranceOfAsset.id,
        Status: 'Pending',
        soldValue: Number(soldValue)
      }
    })
    return { success: true };
  } catch (error) {
    console.log(error)
    throw new Error('Error occured')

  }
}

export const generateCompensation1 = async (userAddress : string, nftId : number, lossAmount : number, nftPrice : number, insuranceId : number , eventId : number): Promise<generateCompensationType> => {
  try{
    if(lossAmount <0){
      return {error : 'Cannot claim when there is no loss'}
    }
    const getInsurance = await db.insurance.findUnique({
      where : {
        id : insuranceId
      },
      select:{
        expiration : true
      }
    })
    if(!getInsurance){
      return {error : "No insurance Record Found"}
    }
    const currentDate = new Date();
    if (new Date(getInsurance.expiration) < currentDate) {
      return { error: "Insurance has Expired" };
    }

    const actualNftPrice = lossAmount + nftPrice;  // loss amount is the amount loss and the nftPrice is the price at which the nft was sold.
    const lossPercent = (lossAmount / actualNftPrice) * 100;
    if(lossPercent < 0){
      return {error: "Error loss percentage less than 0"};
    }
    const updateEventSetClaimedToTrue = await db.nft_events.update({
      where: { id: eventId },
      data: { claim_requested: true },
    });
    const eightyPercentOfLoss = lossAmount * 0.80;
    await db.compensation.create({
      data: {
        loss: lossAmount,
        assetId: nftId,
        lossPercent: lossPercent,
        compensationAmount: eightyPercentOfLoss,
        userAdress: userAddress,
        insuranceId: insuranceId,
        Status: 'Pending',
        soldValue:nftPrice
      }
    })
    console.log('here at the end')
    return { success : true}
  }catch(error){
    console.log(error);
    throw new Error('Error generating compensation')
  }
};

type compensateUserType = { success: boolean }
export const compensateUser = async (idOfCompensation: number): Promise<compensateUserType> => {
  try {
    console.log('in the function of compensate user')
    if (!idOfCompensation) {
      throw new Error('No Id Provided')
    }
    const updatedCompensation = await db.compensation.update({
      where: { id: idOfCompensation },
      data: { Status: 'Confirmed', approval_date : new Date() },
    });
    revalidatePath('/admin/compensation')
    return { success: true }
  } catch (error) {
    console.log(error);
    throw new Error('Error occured')
  }
}
type declineCompensationType = { success: boolean }
export const declineCompensation = async (idOfCompensation: number): Promise<declineCompensationType> => {
  try {
    if (!idOfCompensation) {
      throw new Error('No Id Provided')
    }
    const updatedCompensation = await db.compensation.update({
      where: { id: idOfCompensation },
      data: { Status: 'Declined' },
    });
    revalidatePath('/admin/compensation')
    return { success: true }
  } catch (error) {
    throw new Error('Error Occured')
  }
}


type userCompensateMailSendType = { success: boolean }
export const userCompensateMailSend = async (assetId: number, claimStatus: string, userAddress: string): Promise<userCompensateMailSendType> => {
  try {
    if (!assetId || !claimStatus || !userAddress) {
      return { success: false }
    }
    const userDetails = await db.user.findUnique({
      where: { walletAddress: userAddress }
    });
    if (!userDetails) {
      return { success: false }
    } else {
      const userMail = userDetails.email;
      const userName = userDetails.name ?? '';
      if (!userMail) {
        return { success: false }
      }
      const sendMail = await sendClaimAcceptRejectEmail(userMail, claimStatus, assetId, userName);
      if (sendMail.success == true) {
        return { success: true }
      } else {
        return { success: false }
      }
    }
  } catch (error) {
    console.log(`error in sending mail to the user`)
    console.log(error);
    return { success: false }
  }
}

type compensateClaimedType = { success: boolean }
export const compensateClaimed = async (compensationId: number): Promise<compensateClaimedType> => {
  try {
    const updateCompensation = await db.compensation.update({
      where: { id: compensationId },
      data: { claimed: true },
    });
    return { success: true }
  } catch (error) {
    throw new Error('error')
  }
}

type createAdminType = { success: boolean }
export const createAdmin = async (formData: FormData): Promise<createAdminType> => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      throw new Error('Please Provide Email and Password');
    }
    const checUserExists = await db.admin.findUnique({
      where: { email: email }
    })
    if (checUserExists) {
      throw new Error("User with that email already exists, please choose different email");
    } else {
      const hashedPassword = await hash(password, 10);
      await db.admin.create({
        data: {
          email: email,
          password: hashedPassword
        }
      })
      return { success: true }

    }


  } catch (error) {
    throw new Error('error');
  }
}

type saveOtpToDbType = { success: boolean }
export const saveOtpToDb = async (otp: string, email: string): Promise<saveOtpToDbType> => {
  try {
    if (!otp || !email) {
      throw new Error('Please provide with all the details');
    }
    const otpHashed = await hash(otp, 10);
    await db.otp.create({
      data: {
        email: email,
        expiry: new Date(Date.now() + 10 * 60 * 1000),
        hashedOtp: otpHashed,
      }
    })
    return { success: true }
  } catch (error) {
    console.log(`error saving otp to database`)
    console.log(error)
    return { success: false }
  }
}

type validateAdminPasswordType = { success: boolean }
export const validateAdminPassword = async (email: string, password: string): Promise<validateAdminPasswordType> => {
  try {
    if (!email || !password) {
      return { success: false }
    }
    const adminExists = await db.admin.findUnique({
      where: { email: email }
    })
    if (!adminExists) {

      return { success: false }
    }
    const isMatched = await compare(password, adminExists.password);
    if (isMatched) {

      return { success: true }
    } else {

      return { success: false }
    }
  } catch (error) {
    return { success: false }
  }
}


type validateOtpType = { success: boolean }
export const validateOtp = async (otp: string, emailAddress: string): Promise<validateOtpType> => {
  try {
    if (!otp || !emailAddress) {
      return { success: false }
    }
    const latestOtpRecord = await db.otp.findFirst({
      where: {
        email: emailAddress,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!latestOtpRecord || latestOtpRecord.expiry < new Date()) {
      return { success: false };
    }
    const isOtpValid = await compare(otp, latestOtpRecord.hashedOtp);
    if (isOtpValid) {
      return { success: true }
    } else {
      return { success: false }
    }

  } catch (error) {
    return { success: false }
  }
}
type handleLoginForAdminType = { success: boolean }
export const handleLoginForAdmin = async (email: string, password: string, otp: string): Promise<handleLoginForAdminType> => {

  try {
    if (!email || !password) {
      return { success: false };
    }
    const res = await signIn("credentials", {
      email: email,
      password: password,
      otp: otp,
      redirect: false,
      // redirect : true,
      // redirectTo : '/admin/compensation'
    })
    console.log(`the res is ${res}`)
    return { success: true };
    // redirect('/admin/compensation')
  } catch (error) {
    console.log("in the error clasuse")
    if (error instanceof AuthError) {
      if (error.type == 'CredentialsSignin') {
        console.log('invalid details')
        return { success: false };
      } else {
        return { success: false }
      }
    }
    console.log("in here wrong everything")
    throw error;

  }
}


export const signoutFromAdminPanel = async () => {
  try {
    await signOut();
  } catch (error) {

  }
}


type CreateAdminWalletTypeType = { success: boolean }
export const createAdminWalletType = async (address: string, walletType: string , walletName : string): Promise<CreateAdminWalletTypeType> => {
  try {
    if (walletType == "MINT" || walletType == "COMPENSATION" || walletType == "OWNER") {
      const create = await db.adminWallet.create({
        data: {
          address: address,
          type: walletType,
          name : walletName
        }
      })
      return { success: true }
    } else {
      throw new Error('Invalid Type provided')
    }
  } catch (error) {
    throw new Error('Error Creating admin walet')
  }
}

type deleteAdminWalletsWithIdType = { success: boolean }
export const deleteAdminWalletsWithId = async(id : number):Promise<deleteAdminWalletsWithIdType>=>{
  try{
    await db.adminWallet.delete({
      where : {
        id : id
      }
    });
    return {success : true}

  }catch(error){
    throw new Error('Error Deleting')
  }
}

// change this as well
type purchaseInsuranceType = { success: boolean }
export const purchaseInsurance = async(assetId : number) : Promise<purchaseInsuranceType>=>{
  try{  
    const currentDate = new Date();
    const expirationDate = new Date();
    expirationDate.setFullYear(currentDate.getFullYear() + 2);
    await db.insurance.update({
      where: { nftId: assetId },
      data: {
        is_extended : false,
        expiration: expirationDate,
        active: true, 
      }
    });

    await db.nft.update({
      where: { id: assetId },
      data: {
        is_insured: true
      }
    });
    return {success : true}

  }catch(error){
    throw new Error("Error purchasing nfts")
  }
}


type ExtendInsuranceType = { success: boolean }
export const extendInsurance = async (assetId: number): Promise<ExtendInsuranceType> => {
  try {
   
    const currentInsurance = await db.insurance.findUnique({
      where: { nftId: assetId }
    });

    if (!currentInsurance) {
      throw new Error('Insurance record not found');
    }

    const currentExpirationDate = new Date(currentInsurance.expiration);
    const newExpirationDate = new Date(currentExpirationDate);
    newExpirationDate.setFullYear(currentExpirationDate.getFullYear() + 1); 

    
    await db.insurance.update({
      where: { nftId: assetId },
      data: {
        expiration: newExpirationDate,
        is_extended: true
      }
    });

    return { success: true };

  } catch (error) {
    console.error('Error updating insurance expiration:', error);
    throw new Error('Error updating data');
  }
}

type UpgradeInsuraceType = { success: boolean }
export const upgradeInsurace = async(assetId: number) : Promise<UpgradeInsuraceType>=>{
  try{
    const nft = await db.nft.findUnique({
      where: { id: assetId },
      select: { nft_price: true }
    });

    if (!nft) {
      throw new Error('NFT not found');
    }

    const updatedInsurance = await db.insurance.updateMany({
      where: { nftId: assetId },
      data: { coverage: nft.nft_price }
    });

    return {success : true}
  }catch(error){
    console.log(`error upgrading insurace`)
    console.log(error)
    throw new Error('error upgrading insurance');
  }
}

type BurnNftType = { success: boolean }
export const burnNft = async(nftId : number) : Promise<BurnNftType>=>{
  try{
    await db.nft.update({
      where : {
        id : nftId
      },
      data : {
        nft_owner_address : '0x0000000000000000000000000000000000000000',
        up_for_sale : false
      }
    })
    return { success : true}
  }catch(error){
    throw new Error('Error burning nft')
  }
}