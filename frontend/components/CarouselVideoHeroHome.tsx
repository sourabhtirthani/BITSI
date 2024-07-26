'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CoinPriceHeroLandingPage from "./CoinPriceHeroLandingPage"
import CarouselVideoComponent from "./CarouselVideoComponent"
import { heroHomeVideos } from "@/constants"

export function CarouselVideoHeroHome() {
    
    const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const arrayOfSelectedItems = new Array(heroHomeVideos.length).fill(null);
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
//   const plugin = React.useRef(
//     // Autoplay({ delay: 2000, stopOnInteraction : false  })
//   )
  

  return (
    <Carousel setApi={setApi}
      plugins={[]}
      className=""
    >
      <CarouselContent>
      {heroHomeVideos.map((item , index)=>{
          return (
            <CarouselItem key={index} >
               <CarouselVideoComponent count = {count} current = {current} />
            </CarouselItem>
          )
        })}
        
            
           
     
      </CarouselContent>
     
    </Carousel>
  )
}
