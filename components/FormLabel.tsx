import { FormLabelProps } from '@/types';
import { ReactNode } from 'react';



const FormLabel = ({ children, className = '', htmlFor }: FormLabelProps) => {
  return (
    <label className={`block mb-2 ${className}`} htmlFor={htmlFor}>
      { children }
    </label>
  )
}

export default FormLabel;