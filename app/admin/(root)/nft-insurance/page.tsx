'use client'
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel';
import { readInsuranceContractParamentes } from '@/lib/contractRead';
import Image from 'next/image'
import  { useEffect, useState } from 'react'
import {useAccount , useWriteContract} from 'wagmi'
import { useToast } from "@/components/ui/use-toast"
import { insuraceContractAddress, insuranceContractABI } from '@/lib/insuranceContract';
import { getTransactionFromHash } from '@/lib/getTransactionFromHash';

const NFtInsurance = () => {
    const { toast } = useToast()
    const { writeContractAsync } = useWriteContract()
    const [viewOnly , setViewOnly] = useState<boolean>(true);
    const {address , isConnected} = useAccount();
    const [insuranceCoverage , setInsuranceCoverage] = useState('');
    const [insurancePeriodMonth , setInsurancePeriodMonth] = useState('');
    const [insuranceMonthlyGrowthRate , setInsuranceMonthlyGrowthRate] = useState('');
    const [insuranceHighCompensationLimit , setInsuranceHighCompensationLimit] = useState('');
    const [insurnaceFreezePeriod , setInsurnaceFreezePeriod] = useState('');
    const [compensationFundWallet , setCompensationFundWallet] = useState('');
    const [viewOnlyBitsiToken , setViewOnlyBitsiToken] = useState(true);
    const [bitsiTokenValue , setBitsiTokenValue] = useState('')
    const [refresh , setRefresh] = useState(false);
    const [loaderDuringSubmit , setLoaderDuringSubmit] = useState(false);
    const [loaderDuringSubmitToken , setLoaderDuringSubmitToken] = useState(false);
    const [refreshTokenValue , setRefreshTokenValue] = useState(false);
    useEffect(()=>{
        const readInsuranceDataFromContract= async()=>{
            try{
                const insuraceCoverageFromContract = await readInsuranceContractParamentes('NFT_INSURANCE_COVERAGE');
                setInsuranceCoverage((insuraceCoverageFromContract as string).toString());
                const insurancePeriodMonthFromContract = await readInsuranceContractParamentes('NFT_INSURANCE_PERIOD_MONTH');
                setInsurancePeriodMonth((insurancePeriodMonthFromContract as string).toString())
                const insuranceMonthlyGrowthRateFromContract = await readInsuranceContractParamentes('NFT_INSURANCE_MONTHLY_GROWTH_RATE');
                setInsuranceMonthlyGrowthRate((insuranceMonthlyGrowthRateFromContract as string).toString());
                const insuranceHighCompensationLimitFromContract = await readInsuranceContractParamentes('NFT_INSURANCE_HIGH_COMPENSATION_LIMIT');
                setInsuranceHighCompensationLimit((insuranceHighCompensationLimitFromContract as string).toString());
                const insuraceFreezePeriodFromContract = await readInsuranceContractParamentes('NFT_INSURANCE_FREEZE_PERIOD');
                setInsurnaceFreezePeriod((insuraceFreezePeriodFromContract as string).toString());
                const compensationFundWalletFromContract = await readInsuranceContractParamentes('compensationFundWallet');
                setCompensationFundWallet((compensationFundWalletFromContract as string).toString());
            }catch(error){
                console.log(error)

            }
        }
        readInsuranceDataFromContract();
    }, [refresh])
    useEffect(()=>{
        const readTokenDataFromContract = async()=>{
            const bitsiTokenFromContract = await readInsuranceContractParamentes('bitsiToken');
            setBitsiTokenValue((bitsiTokenFromContract as string).toString());
        }
        readTokenDataFromContract();
    } ,[refreshTokenValue])
    const handleEditClick = ()=>{
        // setViewOnly(viewOnly => !viewOnly)
        setViewOnly(false)
    }
    const handleCancelClick = ()=>{
        setViewOnly(true);
    }
    const handleEditClickBitsiToken = ()=>{
        // setViewOnly(viewOnly => !viewOnly)
        setViewOnlyBitsiToken(false)
    }
    const handleCancelClickBitsiToken = ()=>{
        setViewOnlyBitsiToken(true);
    }

    const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>)=>{
        try{
        event.preventDefault();
        setLoaderDuringSubmit(true);
        if(!isConnected){
            toast({ title: "No wallets Found", description: "Please connect to your admin wallet in order to continue", duration: 2000,
                style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',
                },
              })
              return;
        }
        const formData = new FormData(event.currentTarget);
        const  newInsuranceCoverage = formData.get("nftInsuranceCoverage") as string;
        const newInsuracePeriodMonth = formData.get("nftInsuracePeriodMonth") as string;
        const newInsuraceMonthlyGrowthRate = formData.get("nftInsuraceMonthlyGrowthRate") as string;
        const newInsuranceHighCompensationLimit = formData.get("nftInsuraceHighCompensationLimit") as string;
        const newInsuraceFreezePeriod = formData.get("nftInsuranceFreezePeriod") as string;
        const newCompenastionFundWallet = formData.get("compensationFundWallet") as string;
        // const teset = Number(newInsuranceCoverage)
        if(!newInsuranceCoverage || !newInsuracePeriodMonth || !newInsuraceMonthlyGrowthRate || !newInsuranceHighCompensationLimit || !newInsuraceFreezePeriod || !newCompenastionFundWallet) {
            toast({ title: "Invalid Details", description: "Please fill in all the details", duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},})
            return;
        }
        const transactionUpdateDataInInsurace = await writeContractAsync({
            address: insuraceContractAddress,
            abi: insuranceContractABI,
            functionName: 'updateParameter',
            args: [newCompenastionFundWallet, Number(newInsuranceCoverage),Number(newInsuracePeriodMonth), Number(newInsuranceHighCompensationLimit), Number(newInsuraceFreezePeriod)],
          });
          await getTransactionFromHash(transactionUpdateDataInInsurace);
          toast({ title: "Operation Success", description: "Successfully Updated Parameters", duration: 2000,style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope',},});
          setRefresh(prev => !prev);
    }catch(error){
        toast({ title: "Error", description: "Error Updating data", duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},})
          console.log(error);
    }finally{
        setLoaderDuringSubmit(false);
        setViewOnly(true);
    }
    }

    const handleFormSubmitBitsiToken = async(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        try{
            setLoaderDuringSubmitToken(true);
            const formDataToken = new FormData(event.currentTarget);
            const newBitsiTokenValue = formDataToken.get('bitsiToken')
            console.log(`the value of the token is : ${newBitsiTokenValue}`)
            if(!address){
                toast({ title: "No wallets Found", description: "Please connect to your admin wallet in order to continue", duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},})
                return;
            }
            if(!newBitsiTokenValue){
                toast({ title: "Invalid Details", description: "Please fill in all the details", duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},})
                return;
            }
            const transactionUpdateToken = await writeContractAsync({
                address: insuraceContractAddress,
                abi: insuranceContractABI,
                functionName: 'updateBitsiToken',
                args: [newBitsiTokenValue]
            });
            await getTransactionFromHash(transactionUpdateToken);
            toast({ title: "Operation Success", description: "Successfully Updated Parameters", duration: 2000,style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope',},});
            setRefreshTokenValue(prev => !prev);
        }catch(error){
            toast({ title: "ERROR", description: "Update Error", duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},})
            console.log(error)
        }finally{
            setLoaderDuringSubmitToken(false);
            setViewOnlyBitsiToken(true);
        }
    }


  return (
    <div className='p-8 max-md:p-4 flex flex-col w-full'>
    <div className='flex justify-between mb-14 max-md:mb-7 items-center'>
        <div className='flex flex-col gap-0.5'>
        <p className='font-manrope font-bold text-[24px] text-success-511'>NFT Insurace Parameters</p>
        <p className='text-white text-opacity-50 font-bold font-manrope text-[18px]'>Manage your NFT Insurance here</p>
        </div>
        {/* <button className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '>Connect</button> */}
        <AdminAdressButtonForAdminPanel />
    </div>
    <form onSubmit={handleFormSubmit}>
        <div className='flex flex-col mt-4 gap-10 w-3/4'>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px]  font-manrope'>Insurance Coverage</h1>
            <div className='relative w-full'>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' defaultValue={insuranceCoverage}  disabled = {viewOnly} required name='nftInsuranceCoverage'/>
            <hr  className='border-2 end-16 border-white top-0 h-full absolute text-black'/>
            <p className='text-white absolute bg end-4 top-1  text-[24px] font-bold '>%</p>
            </div>
            <div className='flex gap-1'>
                <Image src='/icons/akar-icons_info-fill.svg' height={18} width={18} alt='help text' />
                <p className='text-white font-montserrat font-bold text-[12px] text-opacity-60'>Insurance may change according to the coin parameters</p>
            </div>

            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px] font-manrope'>Insurance Period Month</h1>
            <div className='relative w-full'>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' defaultValue={insurancePeriodMonth}  disabled = {viewOnly} required name = 'nftInsuracePeriodMonth' />
            <hr  className='border-2 end-24 border-white top-0 h-full absolute text-black'/>
            <p className='text-white absolute bg end-1 top-1  text-[24px] font-bold '>Months</p>
            </div>
            <div className='flex gap-1'>
                <Image src='/icons/akar-icons_info-fill.svg' height={18} width={18} alt='help text' />
                <p className='text-white font-montserrat font-bold text-[12px] text-opacity-60'>Insurance may change according to the coin parameters</p>
            </div>

            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px]  font-manrope'>Insurance Monthly Growth Rate</h1>
            {/* onChange={(e)=>{setInsuranceMonthlyGrowthRate(e.target.value)}} */}
            <div className='relative w-full'>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' defaultValue={insuranceMonthlyGrowthRate}  disabled = {viewOnly} required name='nftInsuraceMonthlyGrowthRate' />
            <hr  className='border-2 end-16 border-white top-0 h-full absolute text-black'/>
            <p className='text-white absolute bg end-4 top-1  text-[24px] font-bold '>%</p>
            </div>
            <div className='flex gap-1'>
                <Image src='/icons/akar-icons_info-fill.svg' height={18} width={18} alt='help text' />
                <p className='text-white font-montserrat font-bold text-[12px] text-opacity-60'>Changes to increase in next few days</p>
            </div>

            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px]  font-manrope'>Insurace High Compensation Limit</h1>
            <div className='relative w-full'>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' defaultValue={insuranceHighCompensationLimit}  disabled = {viewOnly} required name = 'nftInsuraceHighCompensationLimit' />
            <hr  className='border-2 end-16 border-white top-0 h-full absolute text-black'/>
            <p className='text-white absolute bg end-4 top-1  text-[24px] font-bold '>%</p>
            </div>
            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white  font-bold text-[22px] font-manrope'>Inruace Freeze Period</h1>
            <div className='relative w-full'>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' defaultValue={insurnaceFreezePeriod}  disabled = {viewOnly} required name = 'nftInsuranceFreezePeriod' />
            <hr  className='border-2 end-16 border-white top-0 h-full absolute text-black'/>
            <p className='text-white absolute bg end-1 top-1  text-[24px] font-bold '>Days</p>
            </div>
            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white  font-bold text-[22px] font-manrope'>Compensation Fund Wallet</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' defaultValue={compensationFundWallet}  disabled = {viewOnly} required name='compensationFundWallet' />
            </div>
                {viewOnly == true ? 
                <div onClick={handleEditClick} className='flex gap-1 h-[45px] bg-success-511 text-white font-manrope text-18px font-bold py-2 px-4 cursor-pointer rounded-3xl w-fit self-end items-center justify-center'>
                  <Image src = '/icons/basil_edit-outline.svg' height={32} width={32} alt = 'edit' />Edit
                </div> :<div className='flex gap-2  self-end  h-[45px]  '>
                    <button onClick={handleCancelClick} className='bg-success-533 text-white font-manrope px-4 py-2 text-[18px] rounded-3xl font-bold'>Cancel</button>
                     <button disabled = {loaderDuringSubmit} className={`${loaderDuringSubmit ? 'bg-gray-400' : 'bg-success-511'}  text-white font-manrope text-18px font-bold py-2 px-4 cursor-pointer rounded-3xl w-fit items-center justify-center`} type='submit'>{loaderDuringSubmit ? 'Please Wait..' : 'Save Changes'}</button></div>
            }
               
        </div>
            </form>

            <hr  className='border-2 mt-12 mb-12 border-white  w-3/4 text-black'/>
            <form onSubmit={handleFormSubmitBitsiToken}>
            <div className='flex flex-col mt-4 gap-10 w-3/4'>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px]  font-manrope'>Bitsi Token</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' defaultValue={bitsiTokenValue}  disabled = {viewOnlyBitsiToken} required name = 'bitsiToken' />
            </div>
            {viewOnlyBitsiToken == true ? 
                <div onClick={handleEditClickBitsiToken} className='flex gap-1 h-[45px] bg-success-511 text-white font-manrope text-18px font-bold py-2 px-4 cursor-pointer rounded-3xl w-fit self-end items-center justify-center'>
                  <Image src = '/icons/basil_edit-outline.svg' height={32} width={32} alt = 'edit' />Edit
                </div> :<div className='flex gap-2  self-end  h-[45px]  '>
                    <button onClick={handleCancelClickBitsiToken} className='bg-success-533 text-white font-manrope px-4 py-2 text-[18px] rounded-3xl font-bold'>Cancel</button>
                     <button disabled={loaderDuringSubmitToken} className={`${loaderDuringSubmitToken ? 'bg-gray-400' : 'bg-success-511'}  text-white font-manrope text-18px font-bold py-2 px-4 cursor-pointer rounded-3xl w-fit items-center justify-center`} type='submit'>{loaderDuringSubmitToken ? 'Please Wait..' : 'Save Changes'}</button></div>
            }
            </div>
            </form>
    </div>
  )
}

export default NFtInsurance