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


export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string | undefined) => {
  return `${addr?.substring(0, 8)}...`;
};
// return `${addr?.substring(0, 6)}...${addr?.substring(addr.length - 4)}`; this is another way to format address

export const generateRandomTokenId = (): number => {
  return Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
};

export const fixTinaResults = <T>(data: T): T => {
  try {
    const serializedData = JSON.stringify(data);
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error("Error in serializing/deserializing data:", error);
    throw new Error("Handling data failed");
  }
};