'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CoinPriceHeroLandingPage from "./CoinPriceHeroLandingPage"

export function CarouselRoot() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction : false}),
  )
  

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-2xl max-sm:max-w-xs max-custom-sm:hidden"
      
    >
      <CarouselContent >
        <CarouselItem className="flex ">
            <CoinPriceHeroLandingPage headingText="First Hand Coin" amount="11.65&nbsp;BITSI" val = 'up' />
            <CoinPriceHeroLandingPage headingText="Policy Coverage" amount="56.23&nbsp;ETH" val = 'up' />
        </CarouselItem>
        <CarouselItem className="flex">
        <CoinPriceHeroLandingPage headingText="Second Hand Coin" amount="11.65&nbsp;BITSI" val = 'up' />
        <CoinPriceHeroLandingPage headingText="Policy Coverage" amount="10.23&nbsp;ETH" val = 'low' />
        </CarouselItem>
      </CarouselContent>
     
    </Carousel>
  )
}
