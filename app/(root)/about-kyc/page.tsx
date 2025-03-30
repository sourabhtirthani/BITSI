import Image from 'next/image';
import Link from 'next/link';

const AboutKyc = () => {
  return (
    <>
    <div className='navbar-space'></div>

    <section className='bg-success-503'>
        <div className='flex  max-sm:flex-col justify-between p-8 max-md:p-4'>
            <div className=''>
            <Image src = '/icons/about-kyc-img-hero.png' height={273} width={273} alt='KYC' />
            </div>
            <div className=''>
                <p className='font-manrope  font-bold text-[40px] max-sm:text-[26px] text-success-513'>KYC (Know your Customer) Verification</p>
            </div>
        </div>

        <div className='flex max-sm:flex-col md:p-8 max-md:p-4 '>
            <div className='md:w-3/4 '>
            <div className='flex items-center gap-4 p-2 mb-4  md:mb-8'>
            <Image src='/icons/kyc-icon1.png' height={38} width={39} alt='img' />
            <p className='text-[18px] font-normal text-success-519'>KYC (Know Your Customer) verification is a critical process used by businesses, especially in the financial sector, to verify the identity of their clients. This process helps to ensure that businesses are compliant with legal and regulatory requirements, preventing fraud, money laundering, and other illicit activities.</p>
            </div>
            <div className='flex items-center gap-4 p-2 mb-4 md:mb-8'>
            <Image src='/icons/kyc-icon2.png' height={38} width={39} alt='img' />
            <p className='text-[18px] font-normal text-success-519'>KYC involves collecting and verifying various forms of identification and documentation from customers. This may include government-issued IDs, proof of address, and other personal information. The process is not only essential for regulatory compliance but also for maintaining the integrity and security of the financial system.</p>
            </div>
            <div className='flex items-center gap-4 p-2 mb-4  md:mb-8'>
            <Image src='/icons/kyc-icon3.png' height={38} width={39} alt='img' />
            <p className='text-[18px] font-normal text-success-519'>Digital KYC has become increasingly popular due to its efficiency and convenience, allowing customers to complete the verification process online. This method leverages advanced technologies such as biometric verification and AI to streamline the process, making it quicker and more secure.</p>
            </div>
            <div className='flex items-center gap-4 p-2 mb-4  md:mb-8'>
            <Image src='/icons/kyc-icon4.png' height={38} width={39} alt='img' />
            <p className='text-[18px] font-normal text-success-519'>Maintaining up-to-date KYC information is crucial for ongoing compliance and risk management. Businesses must regularly update customer information and monitor transactions to detect any suspicious activities.</p>
            </div>
            </div>
            <div className='md:w-1/4 max-md:hidden relative bottom-32'>
                <Image src = '/icons/about-kyc-img-hero2.png' height={350} width={350} alt='kyc' />
            </div>

        </div>

        <div className='flex mt-3 gap-3 p-8 max-md:p-4 max-sm:flex-col mb-16 max-sm:mb-8'>
           <Link href='/kyc-auth'> <button className='bg-success-513 text-white px-20 text-[22px] py-2 rounded-xl font-semibold'>Proceed</button></Link>
            <button className='bg-transparent border-2 border-success-513 text-white px-20 text-[16px] py-2 rounded-xl font-normal'>Skip</button>

        </div>

    </section>
    </>
  )
}

export default AboutKyc