
import Image from "next/image";
import { ourServicesLinks, testimonials } from "@/constants";
import Hero from "@/components/Hero";
const Home = () => {
  return (
    <section>
  <Hero />

  <section className='bg-success-503'>
      <div className='flex justify-center'>
      <h1 className='font-montserrat text-white lg:text-[47px] font-semibold text-[34px] max-sm:text-[22px] mb-8 lg:mb-20 mt-14 max-md:mt-4'>Our Services</h1>
      </div>
    <div className='grid grid-cols-3 max-md:grid-cols-1 w-full '>
    {ourServicesLinks.map((item)=>{
          return(
            <div className='p-4 mb-4  ' key = {item.id}>
        <div className='hover:bg-success-509  bg-success-507 secondary-shadow11 rounded-xl flex flex-col items-center max-md:p-2 md:p-4 max-h-[500px] h-full' >
          <Image src = {item.imgURL} alt = 'logo' width = {70} height = {70} />
          <p className='text-success-505 font-manrope-400'>{item.label}</p>
          <p className='text-white font-manrope font-normal items-center md:p-8 max-md:p-2 lg:max-text-[18px]'>{item.info}</p>
        </div>
        </div>

          )
        })}
    </div>
    </section>

    <section className='flex flex-col bg-success-507 items-center h-fit mx-auto'>
      <div className="flex-grow flex items-center justify-center mt-3 mb-2">
        <p className='lg:text-[47px] text-white max-sm:text-[22px] font-montserrat text-[34px] mt-3'>Testimonials</p>
      </div>
      <div className="self-start p-2 lg:ml-10">
        <p className='font-moon-dance lg:text-[55px] text-[44px] max-sm:text-[28px] px-3  text-white'>What our Customer </p>
        <p className='font-moon-dance lg:text-[55px] text-[44px] max-sm:text-[28px] px-3 text-success-508'>say about us</p>
        <div className='grid grid-cols-3 max-md:grid-cols-1 w-full '>
        {testimonials.map((item) => {
            return (
              <div key={item.id} className='p-3'>
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

    </section>
  )
}

export default Home

