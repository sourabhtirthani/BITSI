import { FC, ReactNode } from "react";

declare interface OurServicesProps {

}
declare type nftData ={
    id: string,
    nft_name : string,
    nft_price : number,
    nft_image : string,
    nft_collection_name : string
    nft_mint_time : Date
    nft_owner_address : string;
}

declare interface DropdownProps {
    id: number;
    name: string;
    icon: string;
}

declare interface NFTCardProps {
    id: string;
    nft_name: string
    nft_price: number
    nft_image: string;
    nft_collection_name: string;
    setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>;
    checkedItems: string[];
    nft_owner_address : string;

}

declare interface CardNftMyProfileProps{
    id: string;
    name: string
    price: number
    nftImg: string;
}

declare interface FormLabelProps {
    children?: ReactNode;
    className?: string;
    htmlFor?: string;
}

declare interface ButtonProps {
    children?: ReactNode;
    className?: string;
    href?: string;
}

declare interface FormRowProps {
    children?: ReactNode;
    className?: string;
}

declare interface InputTextProps {
    className?: string;
    id?: string;
    name: string;
    type?: 'text' | 'email' | 'number';
    placeHolder: string;
    step?: string;
}

declare interface CoinPriceHeroLandingPageProps{
    headingText : string;
     amount : string;
     val : string;
}


declare interface buyNftDialogProps {
    totalItems : number;
    buttonName : string ;
    showSelectedItem : boolean;
    nameOfClass : string;
    currencyText : string;
    lstOfItems : string[];
    nameOfNft?: string; 
    collectionName?: string; 
    royalty?: Float; 
    imgSrc?: string;
    nftPrice? : Float;
    ownerAddress : string;

}

declare interface collectionListInCreateNft{
    id : number,
    name : string,
    image : string
}

declare type AboutUsContextType = {
    filterValue: string;
    setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  };
  

declare type UploadCollectionSuccess = { success: true };
declare type UploadCollectionError = { error: string };
declare type UploadCollectionType = UploadCollectionSuccess | UploadCollectionError;

declare interface UserData {
    id: string;
    walletAddress: string;
    name: string | null;
    email: string | null;
    number: string | null;
    address: string | null;
    bio: string | null;
    imgSrc : string | null;
  }