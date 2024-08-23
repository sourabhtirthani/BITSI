import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel'
import BarChartComp from '@/components/BarChartComp'
import DashboardCardAdmin from '@/components/DashboardCardAdmin'
import LineChartComp from '@/components/LineChartComp'
import React from 'react'

const AnalyticDashboard = () => {
  return (
    <div className='p-8 max-md:p-4 w-full'>
        <div className='flex justify-between mb-14 max-md:mb-7 items-center'>
            <p className='font-manrope font-bold text-[18px] text-success-511'>Analytics Dashboard </p>
            {/* <button className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '></button> */}
            <AdminAdressButtonForAdminPanel />
        </div>
        <div className='flex flex-col mb-10 max-md:mb-5'>
          <p className='text-white font-normal text-[18px]'>Numerical Representation</p>
          <div className='grid grid-cols-3 gap-3 mt-4 max-xl:grid-cols-2 h-full max-md:grid-cols-1'>
            <div className=''><DashboardCardAdmin heading='BITSI COIN' subHeading='Second Hand Price' thirdLine='Current Price' fourthLine='1BTS = 14.65' iconName='/icons/ethereum.svg' /></div>
            <div className=''><DashboardCardAdmin heading='Active&nbsp;Insurances' subHeading='Total Volume' thirdLine='Active' fourthLine='229' iconName='/icons/solar_arrow-up-broken.svg' /></div>
            <div className=''><DashboardCardAdmin heading='BITSI COIN' subHeading='Second Hand Price' thirdLine='Current Price' fourthLine='1BTS = 14.65' iconName='/icons/solar_arrow-down-broken.svg' /></div>
          </div>
           </div>
           <hr className='border-dotted' />
           <div className='flex flex-col mt-10 max-md:mt-5'>
           <p className='text-white font-normal text-[18px]'>Numerical Representation</p>
            <div className='grid grid-cols-2 gap-2 w-full mt-4 max-lg:grid-cols-1'>
              <LineChartComp titleofChart='Total Prices'  />
              <LineChartComp titleofChart='Policy Coverage' />
            </div>
            <div className='grid grid-cols-2 gap-2 w-full mt-10 max-lg:grid-cols-1'>
              <LineChartComp titleofChart='Voluem of BITSI COIN' />
              <BarChartComp titleofChart='Future Compensation Claim' />
            </div>
            <div className='grid grid-cols-2 gap-2 w-full mt-10 max-lg:grid-cols-1'>
              <LineChartComp titleofChart='Paid Compensation Claim' />
              <BarChartComp titleofChart='Future Compensation Claim' />
            </div>
            <div className='grid  w-full mt-4 max-md:grid-cols-1'>
              <LineChartComp titleofChart='Sale Volume' />
            </div>
           </div>

        
    </div>
  )
}

export default AnalyticDashboard