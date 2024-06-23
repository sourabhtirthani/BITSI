import { ReactNode } from 'react';
import Link from 'next/link';
import { ButtonProps } from '@/types';

const Button = ({ children, className = '', href }: ButtonProps) => {
  if ( typeof href === 'string' ) {
    return (
      <Link href={href}>
        <a className={`inline-block rounded  py-2.5 px-6 text-sm font-bold uppercase text-white  hover:text-white ${className}`}>
          { children }
        </a>
      </Link>
    );
  }

  return (
    <button className={`inline-block rounded py-2.5 px-6 text-sm font-bold uppercase text-white  hover:text-white ${className}`}>
      { children }
    </button>
  )
}

export default Button;