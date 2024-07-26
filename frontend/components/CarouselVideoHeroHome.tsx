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
import Image from "next/image"

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
let elements: string[] = [];
let widthArr : number[]=[]
for (let i = 1; i <= count; i++) {
    if (i == current) {
        elements[i] = '/icons/slider-selected-hero.svg'
        widthArr[i] = 45
    } else {
        elements[i] = '/icons/Ellipse_2164.svg'
        widthArr[i] = 15
    }
}

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
        <div className='flex items-center  py-2 mb-4 justify-center gap-1'>
                 {elements.map((item, index) => {
                    return (
                     
                        <Image src={item} height={45} width={widthArr[index]} alt='image tag' key={index} />
                    )
                })}
            </div> 
             <p>fdsklajfklsd;</p>
     
    </Carousel>
  )
}
