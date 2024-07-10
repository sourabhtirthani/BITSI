// 'use client'
// import React from 'react'
// import { FormControl, FormDescription, FormField, FormItem, FormMessage,  FormLabel, } from './ui/form'
// import { Input } from "@/components/ui/input"
// import { Control, FieldPath, Form } from 'react-hook-form'
// import * as z from "zod";
// import { uploadNftformSchema } from '@/lib/utils';

// interface customInputProps {
//     control : Control<z.infer<typeof uploadNftformSchema>>,
//     nameOfField : FieldPath<z.infer<typeof uploadNftformSchema>>, 
//     formLabel : string , 
//     placeHolder : string
// }
// const CustomInput = ({control , nameOfField , formLabel, placeHolder} : customInputProps) => {
//   return (
//     <FormField
//     control={control}
//     name={nameOfField}
//     render={({field}) => {
//       return (
//       <FormItem>
//        <FormLabel className='font-montserrat text-white text-[22px] font-semibold'>{formLabel}</FormLabel>
//        <FormControl>
//                 <Input placeholder={placeHolder} {...field} type= {nameOfField == 'nftFile' ? 'file' : 'text'}  className={`${(nameOfField == 'nftFile' ||nameOfField == 'collection') ? 'hidden' : ''}  bg-white text-black rounded-xl placeholder:text-gray-400 p-6   font-manrope`} />
//               </FormControl>
//         {/* <FormDescription /> */}
//         <FormMessage className='text-red-700 text-[12px]' />
//       </FormItem>
//     )}}
//   />
//   )
// }

// export default CustomInput


import React from 'react';
import { FormControl, FormField, FormItem, FormMessage, FormLabel } from './ui/form';
import { Input } from "@/components/ui/input";
import { Control, FieldPath } from 'react-hook-form';
import * as z from "zod";
import { uploadNftformSchema } from '@/lib/utils';

interface customInputProps {
  control: Control<z.infer<typeof uploadNftformSchema>>,
  nameOfField: FieldPath<z.infer<typeof uploadNftformSchema>>, 
  formLabel: string, 
  placeHolder: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInput = ({ control, nameOfField, formLabel, placeHolder, onChange }: customInputProps) => {
  return (
    <FormField
      control={control}
      name={nameOfField}
      render={({ field }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (nameOfField === 'nftFile' && e.target.files) {
            field.onChange(e.target.files[0]);
          } else {
            field.onChange(e.target.value);
          }
          if (onChange) {
            onChange(e);
          }
        };

        return (
          <FormItem>
            <FormLabel className='font-montserrat text-white text-[22px] font-semibold'>{formLabel}</FormLabel>
            <FormControl>
              <Input 
                placeholder={placeHolder} 
                type={nameOfField === 'nftFile' ? 'file' : 'text'}  
                className={`${(nameOfField === 'nftFile' || nameOfField === 'collection') ? 'hidden' : ''} bg-white text-black rounded-xl placeholder:text-gray-400 p-6 font-manrope`}
                onChange={handleChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
            <FormMessage className='text-red-700 text-[12px]' />
          </FormItem>
        )
      }}
    />
  );
}

export default CustomInput;