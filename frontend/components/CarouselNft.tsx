'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CoinPriceHeroLandingPage from "./CoinPriceHeroLandingPage"
import BitsiNftBuyCollection from "./BitsiNftBuyCollection"


export function CarouselNft({selectedItems} : {selectedItems : number}) {
  // const plugin = React.useRef(
  //   Autoplay({  delay: 8000, stopOnInteraction: true    })
  // )

  return (   /// all three carousel items are hardcoded as of now..this will be changed when the real data comes in
    <Carousel
      // plugins={[plugin.current]}
      className=""
    >
      <CarouselContent className="">
        <CarouselItem>
        <BitsiNftBuyCollection selectedItems={selectedItems} imgSource = '/icons/nft-desc.png' />
        </CarouselItem>
        <CarouselItem>
        <BitsiNftBuyCollection selectedItems={selectedItems} imgSource="/icons/nft-hand-gradient.svg" />
        </CarouselItem>
        <CarouselItem>
        <BitsiNftBuyCollection selectedItems={selectedItems} imgSource="/icons/nft-girl-looking.svg" />
        </CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
     
    </Carousel>
  )
}
