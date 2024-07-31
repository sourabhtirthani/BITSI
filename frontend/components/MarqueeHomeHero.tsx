import React from 'react'
import CoinPriceHeroLandingPage from './CoinPriceHeroLandingPage'
import Marquee from "react-fast-marquee";

const MarqueeHomeHero = () => {
  return (
    <>
            <Marquee direction='right' speed={100} className='w-full relative' pauseOnHover = {true} style={{
    maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 0.24) 10%, rgba(0, 0, 0, 100) 15%, rgba(0, 0, 0, 0) 95%)',
    WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 0.24) 10%, rgba(0, 0, 0, 100) 15%, rgba(0, 0, 0, 0) 95%)'
  }}>
               <div className='flex gap-1'>
            <CoinPriceHeroLandingPage headingText="First Hand Coin" amount="11.65&nbsp;BITSI" val = 'up' />
            <CoinPriceHeroLandingPage headingText="Policy Coverage" amount="56.23&nbsp;ETH" val = 'up' />
            </div>

            <div className=' flex gap-1 ml-40 mr-40'>
            <CoinPriceHeroLandingPage headingText="Second Hand Coin" amount="11.65&nbsp;BITSI" val = 'up' />
            <CoinPriceHeroLandingPage headingText="Policy Coverage" amount="10.23&nbsp;ETH" val = 'low' />
            </div>
            </Marquee>
            {/* <Marquee>
        <CoinPriceHeroLandingPage headingText="Second Hand Coin" amount="11.65&nbsp;BITSI" val = 'up' />
        <CoinPriceHeroLandingPage headingText="Policy Coverage" amount="10.23&nbsp;ETH" val = 'low' />
        </Marquee> */}
    </>
  )
}

export default MarqueeHomeHero