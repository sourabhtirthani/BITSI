'use client'
import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormMessage,  FormLabel, } from './ui/form'
import { Input } from "@/components/ui/input"
import { Control, FieldPath, Form } from 'react-hook-form'
import * as z from "zod";
import { uploadNftformSchema } from '@/lib/utils';

interface customInputProps {
    control : Control<z.infer<typeof uploadNftformSchema>>,
    nameOfField : FieldPath<z.infer<typeof uploadNftformSchema>>, 
    formLabel : string , 
    placeHolder : string
}
const CustomInput = ({control , nameOfField , formLabel, placeHolder} : customInputProps) => {
  return (
    <FormField
    control={control}
    name={nameOfField}
    render={(field) => (
      <FormItem>
       <FormLabel>{formLabel}</FormLabel>
       <FormControl>
                <Input placeholder={placeHolder} {...field} type= {nameOfField == 'nftFile' ? 'file' : 'text'}  className={(nameOfField == 'nftFile' ||nameOfField == 'collection') ? 'hidden' : ''} />
              </FormControl>
        {/* <FormDescription /> */}
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default CustomInput