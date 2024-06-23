import { FC, ReactNode } from "react";

declare interface OurServicesProps {

}


declare interface DropdownProps {
    id: number;
    name: string;
    icon: string;
}

declare interface NFTCardProps {
    id: string;
    name: string
    price: number
    checked: boolean;
    nftImg: string;
    category: string;
    setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>;
    checkedItems: string[];

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
    type?: 'text' | 'email';
    placeHolder: string;
}

declare interface CoinPriceHeroLandingPageProps{
    headingText : string;
     amount : string;
     val : string;
}


declare interface buyNftDialogProps {
    totalItems : number,
    buttonName : string , 
    showSelectedItem : boolean,
    nameOfClass : string,
    currencyText : string

}

declare type AboutUsContextType = {
    filterValue: string;
    setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  };
  