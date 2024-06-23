import DashboardCardAdmin from '@/components/DashboardCardAdmin'
import React from 'react'

const AnalyticDashboard = () => {
  return (
    <div className='flex flex-col gap-12 p-10 '>
        <h1 className='text-success-511 text-[18px] '>Views And Analysis</h1>
        <p className='text-white text-[16px]  font-manrope font-semibold'>Numerical Representation</p>
        <div className='grid grid-cols-3 max-xl:grid-cols-2 gap-3 max-lg:grid-cols-1 max-lg:place-items-center '>
            <div><DashboardCardAdmin /></div>
            <div><DashboardCardAdmin /></div>
            <div><DashboardCardAdmin /></div>
        </div>
        
    </div>
  )
}

export default AnalyticDashboard