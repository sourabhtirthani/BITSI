"use client"

import { ArrowDownRightFromCircle , LucideCircleArrowOutUpRight } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Image from "next/image"

export const description = "A simple area chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]


export function HomeChart({heading , colorHex} : {heading : string , colorHex : string}) {
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: colorHex,
      },
    } satisfies ChartConfig
  return (
    <Card className="bg-white rounded-2xl">
      <CardHeader>
        <div className="flex gap-3 items-center font-montserrat text-black  font-semibold">
        <Image src = '/icons/bitsi.svg' alt="" height={48} width={48} />
        <CardTitle className="text-[18px] max-lg:text-[12px] max-md:text-[16px]">{heading}</CardTitle>
        </div>
        {/* <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            {/* <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full ">
            <p className="text-[20px] max-lg:text-[14px] font-bold">$2,300.32</p>
            <div className="flex gap-1 font-montserrat font-normal  items-center">
                <p className=" text-[14px]">+ 6.75%</p>
                <LucideCircleArrowOutUpRight color={colorHex} />
            </div>
        </div>
      </CardFooter>
    </Card>
  )
}
