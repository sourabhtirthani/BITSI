import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { faqs } from "@/constants"
  
  export function HomeFaq() {
    return (
        <div className="bg-success-534 w-full flex flex-col items-center justify-center mb-32 text-white p-8 max-md:p-4">
            <p className="font-poppins text-[42px] max-md:text-[20px] mt-10 font-bold">Frequently Asked Questions (FAQ)</p>
            <p className="font-manrope font-normal text-[20px] max-md:text-[12px] mb-16 max-md:mb-8">Find answers to common questions about BITSI&apos;s cost management services and learn how to optimize your crypto investments.</p>
            <div className="w-3/5">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((item , index)=>{
            return (
                <AccordionItem key={index} value={index.toString()} className="border-2 mb-4  border-success-535  px-4">
          <AccordionTrigger className="text-[22px] font-montserrat font-semibold max-md:text-[14px] text-start">{item.question}</AccordionTrigger>
          <AccordionContent className="font-montserrat text-[18px] max-md:text-[8px] font-normal ">
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
  