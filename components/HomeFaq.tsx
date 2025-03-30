import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { faqs } from "@/constants"
  
  export function HomeFaq() {
    return (
        <div className="bg-success-534 gap-8 max-md:gap-4 w-full flex flex-col   text-white p-8 max-md:p-4">
            <p className="font-poppins text-[2.625rem] pt-[6.25rem] leading-[3.938rem]  font-bold">Frequently Asked Questions</p>
            {/* <p className="font-manrope font-normal text-[20px] max-md:text-[12px] mb-16 max-md:mb-8">Find answers to common questions about BITSI&apos;s cost management services and learn how to optimize your crypto investments.</p> */}
            {/* w-3/5 max-md:w-4/5 */}
            <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((item , index)=>{
            return (
                <AccordionItem key={index} value={index.toString()} className="py-5 max-md:py-2.5"  style={{ borderBottomWidth: '0.5px', borderColor: '#FFFFFF' }}>
          <AccordionTrigger className="text-[1.320rem] leading-[1.373rem] font-montserrat font-semibold  text-start">{item.question}</AccordionTrigger>
          <AccordionContent className="leading-[1.373rem] font-montserrat text-[1.125rem]  font-normal ">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
            )
        })}
      </Accordion>
      </div>
      </div>
    )
  }
  