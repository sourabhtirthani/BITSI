
import Image from "next/image";
import { homeBitsiSteps, ourServicesLinks, testimonials } from "@/constants";
import Hero from "@/components/Hero";
import Link from "next/link";
import { HomeFaq } from "@/components/HomeFaq";
import { ArrowBigDown, ArrowDownIcon } from "lucide-react"
import { HomeChart } from "@/components/HomeChart";
const Home = () => {
  return (
    <section>
  <Hero />

  <section className='bg-success-503'>
      <div className='flex justify-center'>
      <h1 className='font-montserrat text-white lg:text-[47px] font-semibold text-[34px] max-sm:text-[22px] mb-8 lg:mb-20 mt-14 max-md:mt-4'>Our Services</h1>
      </div>
    <div className='grid p-8 grid-cols-3 max-md:grid-cols-1 w-full '>
    {ourServicesLinks.map((item)=>{
          return(
            <Link href = {item.url} key = {item.id} className="p-1 mb-4">
            {/* <div className='  ' > */}
        <div className='hover:bg-success-509 bg-success-507 secondary-shadow11 rounded-xl flex flex-col items-center max-md:p-2 md:p-4 max-h-[520px] h-full' >
          <Image src = {item.imgURL} alt = 'logo' width = {70} height = {70} />
          <p className='text-success-505 mt-2 font-manrope-400'>{item.label}</p>
          <p className='text-white font-manrope font-normal items-center md:p-8 max-md:p-2 lg:text-[18px]'>{item.info}</p>
        </div>
        {/* </div> */}
        </Link>

          )
        })}
    </div>
    </section>


    <section className="bg-success-503 p-8 max-md:p-4">
      <p className="font-montserrat text-[32px] mb-4 max-md:text-[24px] text-white font-semibold">BITSI Market Insights</p>
      <div className="grid grid-cols-3 lg:gap-6 max-lg:gap-3 py-4 max-md:grid-cols-1 w-full">
        <HomeChart heading="Market BITSI Cap"  colorHex="#F8AE55"/>
        <HomeChart heading="Protection Fund Balance" colorHex="#00A478" />
        <HomeChart heading="Total Protected Volume" colorHex="#7854DF" />
      </div>
    </section>


    <section className="bg-success-534 py-4 flex flex-col items-center  text-white font-montserrat justify-center">
        <p className="text-[32px] max-md:text-[18px] font-bold ">Why Choose BITSI?</p>
        <Image src = '/icons/ArrowdownHome.svg' alt="" height={48} width={24} />
        {homeBitsiSteps.map((item , index)=>{
          return (
        <div key={index} className="flex flex-col items-center">
          <p className="font-bold text-[22px] max-md:text-[14px]">{item.primary}</p>
          <p className="text-[16px] max-md:text-[10px] font-normal">{item.secondary}</p>
          <Image src = '/icons/ArrowdownHome.svg' alt="" height={48} width={24} />
        </div>
          )
        })}
      <button className="pushable"><span className="front text-[18px] font-semibold font-montserrat max-md:text-[14px]">Join the BITSI Community</span></button>
    </section>

    <section className='flex flex-col bg-success-507 items-center h-fit mx-auto'>
      <div className="flex-grow flex items-center justify-center mt-3 mb-2">
        <p className='lg:text-[47px] text-white max-sm:text-[22px] font-montserrat text-[34px] mt-3'>Testimonials</p>
      </div>
      <div className="self-start p-2 ">
        <p className='font-moon-dance lg:text-[55px] text-[44px] max-sm:text-[28px] px-8 max-md:px-4  text-white'>What our Customer </p>
        <p className='font-moon-dance lg:text-[55px] text-[44px] max-sm:text-[28px] px-8 max-md:px-4 text-success-508'>say about us</p>
        <div className='grid grid-cols-3 max-md:grid-cols-1 w-full p-5 max-md:p-2 md:mb-40 max-md:mb-20'>
        {testimonials.map((item) => {
            return (
              <div key={item.id} className='p-2.5'>
              <div className='bg-success-509 hover:bg-success-503  flex flex-col lg:p-3 max-md:p-2 rounded-2xl h-full' >
                <div className='flex justify-between'>
                  <div className='flex gap-2 mb-2'>
                    <Image src='/icons/testimonial-pf-img.svg' height={74.4} width={80} alt='profile Image' />
                    <div className='flex flex-col'>
                      <p className='text-white'>{item.name}</p>
                      <p className='text-white font-manrope font-light'>{item.position}</p>
                    </div>
                  </div>
                  <div className='flex flex-end gap-1'>
                    
                  {Array.from({ length: item.stars }, (_, index) => (
                    <Image key={index} src='/icons/star-golden.svg' height={18.51} width={16.74} alt='Filled Star' className='overflow-hidden'  />
                  ))}
                  {Array.from({ length: 5-item.stars }, (_, index) => (
                    <Image key={index} src='/icons/star-white.svg' height={18.51} width={16.74} alt='Filled Star' className='overflow-hidden' />
                  ))}
                </div>
                </div>
                <hr className='border-t border-dotted border-white border-1 lg:mb-3 ' />
                <p className='font-manrope text-white max-custom-lg:min-h-[80px]'>{item.review}</p>

              </div>
              </div>

            )
          })}
        </div>
      </div>
    </section>

    <HomeFaq />
      <div className="h-[70px]"></div>
    </section>
  )
}

export default Home

