
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ToolTipHoverEffect({btnName , hoverInfo} : {btnName : string , hoverInfo : string}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <button className='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5 max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance'>{btnName}</button>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-monserrat">
          <p>{hoverInfo}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
