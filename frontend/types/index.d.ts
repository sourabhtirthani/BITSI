import { FC, ReactNode } from "react";

declare interface OurServicesProps {

}
declare type nftData = {
    id: number,
    nft_name: string,
    nft_price: number,
    nft_image: string,
    nft_collection_name: string
    nft_mint_time: Date
    nft_owner_address: string;
    collection: {
        image: string;
    };
}

declare interface MyWalletNftUserZone {
    id: number;
    nft_mint_time: Date;
    is_insured: boolean;
    nft_price: number;
    nft_name : string;
  }
  declare interface MyWalletNftUserZoneWithInsurace {
    id: number;
    nft_mint_time: Date;
    is_insured: boolean;
    nft_price: number;
    nft_name: string;
    expiration : Date;
    soldValue : any;
    coverage : any;
  }


declare interface NftEventGet {
    id: number;
    nft_event: string;
    nft_price: number;
    from: string;
    to: string;
    time: Date;
    nftId: number;
    assetName: string;
   
  }
  interface AdminNftEventDetail  {
    id: number;           
    nft_event: string;     
    nft_price: number;     
    from: string;        
    to: string;         
    time: Date;           
    nftId: number;        
    asset_name: string;   
    nft: {
      nft_name: string;   
      collection: {
        name: string;     
      }
    }
  }

  declare interface NftEventGetInsurace {
    id: number;
    nft_event: string;
    nft_price: number;
    from: string;
    to: string;
    time: Date;
    nftId: number;
    expiration : Date;
    soldValue : any;
    coverage : any;
  }

//  declare interface InsuranceDetail {
//     id : number;
//     nftId: number;
//     soldValue?: string;
//     coverage?: string;
//     expiration?: string;
//   }

declare interface CompensationDetails {
    id: number;
    requestDate: Date;
    loss: number;
    lossPercent: number;
    compensationAmount: number;
    userAdress: string;
    insuranceId: number;
    assetId: number;
    Status: string;
    soldValue : number;
}

declare interface DropdownProps {
    id: number;
    name: string;
    icon: string;
}

declare interface DropdownPropsForInsuranceTable {
    id: number;
    name: string;
}

declare interface NFTCardProps {
    id: number;
    nft_name: string
    nft_price: number
    nft_image: string;
    nft_collection_name: string;
    setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>;
    checkedItems: string[];
    nft_owner_address: string;
    collectionImage : string

}

declare interface nftInUserZone {
    nft_name: string;
    nft_image: string;
    nft_collection_name: string;
    collection: {
        image: string;
    };
}


declare interface CardNftMyProfileProps {
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

declare interface CoinPriceHeroLandingPageProps {
    headingText: string;
    amount: string;
    val: string;
}


declare interface buyNftDialogProps {
    totalItems: number;
    buttonName: string;
    showSelectedItem: boolean;
    nameOfClass: string;
    currencyText: string;
    lstOfItems: string[] | number[];
    nameOfNft?: string;
    collectionName?: string;
    // royalty?: Float;
    imgSrc?: string;
    nftPrice?: Float;
    ownerAddress: string;
    pricesArray? : number[];

}

declare interface collectionListInCreateNft {
    id: number,
    name: string,
    image: string
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
    imgSrc: string | null;
}

declare interface nftDataForMulitpleNftSelectPage {
    id: number;
    nft_name: string;
    nft_price: number;
    nft_image: string;
    nft_collection_name: string;
    nft_collection_id: number;
    // nft_royalties: number;
    nft_description: string;
    nft_owner_address: string;
    up_for_sale : boolean;
}

declare interface DataOfNFtJsonAdmin {
    name: string;
    description: string;
    image: string;
}


declare interface AdminWallets {
    id: number;
    address: string;
    type: 'MINT' | 'COMPENSATION' | 'OWNER';
}

declare interface AdminWalletMintProps{
    id: number;
    address: string;
    type ; string;

}