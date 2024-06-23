import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateQueryString = (checkedItems: string[]): string => {
  if (checkedItems.length === 0) {
    return '';
  }
  // return `?ids=${checkedItems.join('&')}`;
   return checkedItems.map((id, index) => `id${index+1}=${id}`).join('&');
};