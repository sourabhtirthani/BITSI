'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CoinPriceHeroLandingPage from "./CoinPriceHeroLandingPage"
import BitsiNftBuyCollection from "./BitsiNftBuyCollection"
import { nftDataForMulitpleNftSelectPage } from "@/types"


export function CarouselNft({ allSelectedItems} : { allSelectedItems : nftDataForMulitpleNftSelectPage[]}) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const arrayOfSelectedItems = new Array(allSelectedItems.length).fill(null);
  React.useEffect(() => {
    if (!api) {
      console.log('in here in the no')
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  // const plugin = React.useRef(
  //   Autoplay({  delay: 8000, stopOnInteraction: true    })
  // )

  return (   /// all three carousel items are hardcoded as of now..this will be changed when the real data comes in
    <Carousel setApi={setApi}
      // plugins={[plugin.current]}
      className=""
    >
      <CarouselContent className="">
        {allSelectedItems.map((item , index)=>{
          return (
            <CarouselItem key={index}>
               <BitsiNftBuyCollection selectedItemData={item} selectedItems={allSelectedItems.length} imgSource = '/icons/nft-desc.png' current = {current} count = {count}  />
            </CarouselItem>
          )
        })}
        {/* <CarouselItem>
        <BitsiNftBuyCollection selectedItems={selectedItems} imgSource = '/icons/nft-desc.png' current = {current} count = {count}  />
        </CarouselItem>
        <CarouselItem>
        <BitsiNftBuyCollection selectedItems={selectedItems} imgSource="/icons/nft-desc.png" current = {current} count = {count} />
        </CarouselItem>
        <CarouselItem>
        <BitsiNftBuyCollection selectedItems={selectedItems} imgSource="/icons/nft-desc.png" current = {current} count = {count} />
        </CarouselItem> */}

       
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
     
    </Carousel>
  )
}
