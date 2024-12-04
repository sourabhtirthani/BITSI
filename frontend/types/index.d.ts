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
  nft_name: string;
}
declare interface MyWalletNftUserZoneWithInsurace {
  id: number;
  nft_mint_time: Date;
  is_insured: boolean;
  nft_price: number;
  nft_name: string;
  expiration: Date;
  soldValue: any;
  coverage: any;
}

declare interface NftDataWithInsurace {
  id: number;
  nft_name: string;
  nft_price: number;
  nft_mint_time: Date;
  is_insured: boolean;
  insurance?: {
    coverage: number;
    startTime: Date;
    expiration: Date;
    active: boolean;
    approved: boolean;
    // soldValue?: number;
    currentOwner?: string;
  };
}

declare interface CoinMarketTableProps {
  platform: string;
  type: string;
  price: number;
  scale: number;
}
declare interface CoinBoxBuyProps {
  key: string;
  value: string;
}

declare interface CoinKeyFeaturesProps {
  key: string;
  value: string;
  howItWorks: CoinHowItWorksProps[];
}
declare interface CoinHowItWorksProps {
  heading: string;
  data: string;
}

interface AdminNftEventDetail {
  id: number;
  nft_event: string;
  nft_price: number;
  from: string;
  to: string;
  time: Date;
  nftId: number;
  // claim_requested : boolean;    
  asset_name: string;
  nft: {
    nft_name: string;
    collection: {
      name: string;
    }
  }
}

declare interface Nfts {
  id: number;
  nft_name: string;
  nft_price: number;
  nft_image: string;
  nft_collection_name: string;
  nft_collection_id: number;
  nft_description?: string;
  nft_owner_address: string;
  nft_creator_address: string;
  nft_mint_time: Date;
  is_admin_minted: boolean;
  nft_liked?: number;
  up_for_sale: boolean;
  is_insured: boolean;
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
  // insuranceId: number;
  assetId: number;
  Status: string;
  // soldValue : number;
  claimed: Boolean;
  approval_date?: number;
  claimId: number;
  claim: {
    soldPrice: number;
  };
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
  collectionImage: string

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
  pricesArray?: number[];

}

declare interface collectionListInCreateNft {
  id: number,
  name: string,
  image: string
}
declare interface HomeHowCryptoWorksTypes {
  heading: string;
  description: string;
  btns: { label: string, url: string, tailwindClassName: string }[];
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
  up_for_sale: boolean;
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
  name: string;
}

declare interface AdminWalletMintProps {
  id: number;
  address: string;
  type: string;
  name: string;

}


declare interface NftEventsResponseClaimUserZone {  // this interface is also used in my history section of the userzone
  id: number;
  nft_event: string;
  nft_price: number;
  from: string;
  to: string;
  time: string;
  nftId: number;
  asset_name: string;
  loss_amount?: number;
  // claim_requested : boolean;
  nft: {
    nft_price: number;
    nft_owner_address: string;
    nft_name: string;
    insurance: {
      id: number;
      coverage: number;
      startTime: string;
      expiration: string;
      active: boolean;
      approved: boolean;
      soldValue?: number;
      nftId: number;
      currentOwner?: string;
      is_extended?: boolean;
    };
  };
}

declare interface PurcahseInsuraceUserZone {
  id: number;
  nft_name: string;
  nft_price: number;
  nft_mint_time: Date;
  is_insured: boolean;
  insurance?: {
    coverage: number;
    startTime: Date;
    expiration: Date;
    active: boolean;
    approved: boolean;
    currentOwner: string;
    status: 'ApprovalPending' | 'Approved' | 'Active';
  } | null;
}

declare interface CompensationParams {
  userAddress: string;
  nftId: number;
  lossAmount: number;
  nftPrice: number;
  insuranceId: number;
}

declare interface DialogUserZoneProtectionProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
  assetId: number;
  assetName: string;
  action: string;
  buttonText: string;

  lossAmount?: number;
  lossPercent?: number; //for claim 
  claimId?: number;


  // soldValue?: number; 

  insuranceId?: number;
  // eventId? : number;
  insuranceStatus?: string;
}

declare interface UserZoneHistoryInsuranceEvent {
  id: number;
  eventname: string;
  insuranceid: number;
  date: Date;
  assetType: string;
  insurance: {
    currentOwner: string
    coverage: number;
    nftId: number;
    startTime: Date;
    expiration: Date;
  };
}


declare interface InsuranceEventsAdminTable {
  id: number;
  eventname: string;
  insuranceid: number;
  date: Date;
  assetType: string;
  insurance: {
    expiration: Date;
    currentOwner: string;
    nftId: number;
  };
}

declare interface AllEventsLstProps {
  name: string,
}

declare interface DropDownAdminViewAnalyseFiltersProps {
  allEventsLst: AllEventsLstProps[];
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  btnNameFirst: string;
  eventsInsuranceEvents: AllEventsLstProps[];
  selectedTab: string;
}

declare interface AdminFilterViewAnalyseDateRangeFilterProps {
  className: string;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange>>;
}

declare interface InsuranceStatusTableAdminPanel {
  id: number;
  coverage: number;
  startTime: Date;
  approved: boolean;
  nftId: number;
  currentOwner: string;
  status: InsuranceStatus;

}

enum InsuranceStatus {
  ApprovalPending = "ApprovalPending",
  Approved = "Approved",
  Active = "Active",
}


declare interface ClaimProps {  // used in userzone table claim 
  id: number;
  userAddress: string;
  compensationGenerated: boolean;
  expiration: Date;
  buyPrice: number;
  soldPrice: number;
  loss: number; // can be negative if the user made a profit
  assetId: number;
  coverage: number;
  lossPercent: number;
  date: Date;
}


declare interface WalletUserZoneCoin {
  id: number;
  userAddress: string;
  totalCoins: number;
  totalAmount: number;
  unInsuredCoins: number;
  createdAt: Date;
}

declare interface CoinTransaction {
  id: number;
  coinsTransferred: number;
  createdAt: Date;
  eventName: string;
  coinId: number;
  price: number;
  from : string;
  to: string;
}

declare interface CoinWithInsurances {
  id: number;
  userAddress: string;
  totalCoins: number;
  totalAmount: number;
  unInsuredCoins: number;
  createdAt: Date;
  updatedAt: Date;
  insurances: {
    id: number;
    coinId: number;
    coinsInsured: number;
    coverage: number;
    startTime: Date;
    expiration: Date;
    status: "ApprovalPending" | "Approved" | "Denied";
    is_extended: boolean;
  }[] | null;
}


declare interface CoinInsuranceDetailsAdmin {
  id: number;
  coinId: number;
  coinsInsured: number;
  coverage: number;
  startTime: Date;
  expiration: Date;
  status: InsuranceStatus;
  is_extended: boolean;
  coin: {
    id: number;
    userAddress: string;
    totalCoins: number;
    totalAmount: number;
    unInsuredCoins: number;
    createdAt: Date;
  };
}

declare interface CoinInsuranceDetailsUserZone {
  status: InsuranceStatus;
  id: number;
  coinId: number;
  coinsInsured: number;
  coverage: number;
  startTime: Date;
  expiration: Date;
  is_extended: boolean;
}

declare interface CoinEventsUserZoneHistory {
  id: number;
  insuranceId: number;
  eventName: string;
  description: string | null;
  coinsAffected: number | null;
  timestamp: Date;
  insurance: {
    coverage: number;
    expiration: Date;
  }
}