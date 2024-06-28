import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'



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


export const uploadNftformSchema  = z.object({
  // email: z.string().email(),
  nftFile: z
    .instanceof(File)
    .refine((file) => {
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'svg', 'mp4', 'gif'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      return fileExtension && allowedExtensions.includes(fileExtension);
    }, {
      message: 'Invalid file type. Allowed types: .jpg, .jpeg, .png, .svg, .mp4, .gif'
    }),
  name: z.string().min(1, { message: 'Name Of Your NFT is required' }),
  price: z.string().min(1, { message: 'Price is required' }),
  collection: z.string().min(1, { message: 'Collection is required' }),
  royalties: z.string().min(1, { message: 'Royalties are required' }),
  description: z.string().optional()
});