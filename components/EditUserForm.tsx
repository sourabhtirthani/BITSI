'use client'
import { UserData } from '@/types';
import { formatAddressUserZone } from '@/lib/utils';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { upsertUserProfile } from '@/actions/uploadNft';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
// const fetchData = async(address : string)=>{
//     try{
//     const data = await fetch(`/api/user/${address}` , { cache : 'no-cache'});
//     const userDetails = await data.json();
//     return userDetails;
//     }catch(error){
//         console.log(error)
//         console.log('in here')
//     return null;
//     }
// }

export default  function EditUserForm({addressOfUser} : { addressOfUser : string}) {
    const { push } = useRouter();
  const { toast } = useToast();
    const [userData ,setUserData] = useState<UserData>();
    const [previewImage , setPreviewImage] = useState('/icons/image_pfp_no_pfp.png')
    const [formSubmitting , setFormSubmitting] =  useState<boolean>(false);
    const handleFormSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setFormSubmitting(true);
    
        const formData = new FormData(e.currentTarget);
        try{
        const res = await upsertUserProfile(formData);
        if(res.success){
            toast({
                title: "Operation Success",
                description: res.success,
                duration: 2000,
                style: {
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  fontFamily: 'Manrope',
                },
              });
        }
        push('/my-profile')
        }catch(error){
            console.log(error)
            // setFormSubmitting(false);
            toast({title: "Operation Failed",description:'Failed To Update ',duration: 2000,
                style: {backgroundColor: '#900808',color: 'white',fontFamily: 'Manrope',},});
        }
    }
    const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target?.files?.[0]){
        const file = e.target?.files?.[0]
        const imgURL = URL.createObjectURL(file);
        setPreviewImage(imgURL)
        }
    }
        
    useEffect(()=>{
        const fetchData = async(address : string)=>{
            try{
            const data = await fetch(`/api/user/${address}` , { cache : 'no-cache'});
            if(!data){
                return;
            }
            const userDetails = await data.json();
            setUserData(userDetails)
            if(userDetails.imgSrc){
                setPreviewImage(userDetails.imgSrc)
            }
            // setPreviewImage(userData?.imgSrc || '/icons/profile-logo.png')
            }catch(error){
                console.log(error)
                console.log('in here')
            
            }
        }
        fetchData(addressOfUser);
    } , [addressOfUser])


    const validatePhoneNumber = (value: string): boolean => {
        const phoneNumberPattern = /^(?:\d{10})?$/;
        return phoneNumberPattern.test(value);
      };
    const handleInvalid = (event: React.FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        if (!validatePhoneNumber(input.value)) {
          input.setCustomValidity('Please enter 10-digit phone number.');
        } else {
          input.setCustomValidity('');
        }
        
        
        // input.focus();
      };
  return (
    // action={(formData)=>handleFormSubmit(formData)}
    <form onSubmit={handleFormSubmit}>
    <div className='mt-40 overflow-hidden  flex max-md:flex-col max-md:gap-4 p-8 justify-center items-center mb-20'>
        <div className='bg-success-512 md:z-50  max-md:w-3/4 flex gap-4 max-md:p-10 py-20 max-lg:px- px-24 flex-col items-center justify-center secondary-shadow11'>
            <p className='text-white text-[32px] font-manrope font-bold'>Profile&nbsp;Image</p>
            <input onChange={(e)=>{handleOnChange(e)}} type='file' name='imgSrc' className='hidden' id='imgSrc' accept=".jpg,.png"   />
            <label htmlFor='imgSrc'>
            <Image src={previewImage} height={200} width={200} alt='Profile Image' className='cursor-pointer min-h-[200px] max-h-[200px] w-[200px] rounded-full ' /></label>
            <p className='text-success-515 text-[32px] font-bold font-manrope'>{userData?.name}</p>
            <p className='text-white text-[32px] font-bold font-manrope'>{formatAddressUserZone(addressOfUser)}</p>
        </div>  
        <div className='md:relative md:right-[10%] max-md:w-3/4 md:items-end md:h-[651.92px] md:w-[823.22px]  bg-white p-20 max-md:p-10 flex flex-col '>
            <div className='flex flex-col md:w-3/4 gap-6  mt-3 bg-transparent'>
            <p className='text-success-513 text-[30px] font-manrope self-start font-bold'>Edit Your Information</p>
                <input value={addressOfUser} name = 'walletAddress' id = 'walletAddress' hidden />
                <input defaultValue={userData?.name || ''} maxLength={19}  name = 'name' id='name' placeholder='Name*' className=' text-black font-manrope bg-transparent p-3 border-2 border-gray-400 rounded-xl' required/>
                <input defaultValue={userData?.email || ''}  type='email' name = 'email' id='email' placeholder='email*' className=' text-black font-manrope bg-transparent p-3 border-2 border-gray-400 rounded-xl' required/>
                <input defaultValue={userData?.number || ''} onInvalid={handleInvalid}   type='tel' pattern="[0-9]{10}"   name = 'number' id='number' placeholder='Whatsapp' className=' text-black font-manrope bg-transparent p-3 border-2 no-spinners border-gray-400 rounded-xl' />
                <input defaultValue={userData?.address || ''}  name = 'address' id='address' placeholder='Address' className=' text-black font-manrope bg-transparent p-3 border-2 border-gray-400 rounded-xl' />
                {/* <input defaultValue={userData?.bio || ''}  name = 'bio' id='bio' placeholder='Bio' className=' text-black font-manrope bg-transparent p-3 border-2 border-gray-400 rounded-xl' /> */}
                <button  type='submit' className={`w-full ${formSubmitting ? 'bg-gray-300 disabled' : 'bg-success-511'}  text-white font-manrope font-bold p-4 max-lg:p-2 text-[22px]`}>{formSubmitting ? <div className='flex items-center justify-center'><div className="spinner mr-2 "></div></div> : <p>Update&nbsp;Profile</p>}</button>
            </div>
        </div>
    </div>
    </form>
  )
}

// export default EditUserForm