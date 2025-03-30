import { FormRowProps } from '@/types';
import { ReactNode } from 'react';



const FormRow = ({ children, className = '' }: FormRowProps) => {  // will be used as div for forms//
  return (
    <div className={`${className}`}>
      { children }
    </div>
  )
}

export default FormRow;