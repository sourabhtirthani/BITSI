import { redirect } from "next/dist/server/api-utils"

export const ourServicesLinks = [
    {
        id : 1,
        imgURL : '/icons/incusrance-icon-userzone.svg',
        label : 'PROTECTION',
        info : 'A comprehensive system designed to provide financial security within the cryptocurrency space, offering safeguards against risks such as hacks, scams, or market volatility.' ,
        url : '/protection'
    },
    {
        id : 2,
        imgURL : '/icons/coin-icon-userzone.svg', 
        label : 'BITSI COIN',
        info : 'The native cryptocurrency of the BITSI ecosystem, likely used for transactions within the platform, incentivizing participation, and potentially powering features like staking or governance.',
        url : '/bitsi-coin'
    },
    {
        id : 3,
        imgURL : '/icons/nft-icon-userzone.svg',
        label : 'BITSI NFT',
        info : 'A comprehensive system designed to provide financial security within the cryptocurrency space, offering safeguards against risks such as hacks, scams, or market volatility.',
        url : '/bitsi-nft'
    }
]


export const testimonials = [
    {
        id : 1,
        name : 'Floreen',
        imgURL : '/icons/testimonial-pf-img.svg',
        position : 'CTO',
        stars : 4,
        review : 'I have been using BITSI NFT for a few months now, and I am incredibly impressed with the platform. The process of minting and trading NFTs is seamless, and the security measures give me confidence in my investments.'
    },
    {
        id : 2,
        name : 'TEST Name',
        imgURL : '/icons/testimonial-pf-img.svg',
        position : 'Software Developer',
        stars : 2,
        review : 'I hacess of give me confidence in my investments.'
    },
    {
        id : 3,
        name : 'TEST NAME BUG NAME HERE',
        imgURL : '/icons/testimonial-pf-img.svg',
        position : 'Vice President',
        stars : 1,
        review : ' of minting and trading  '
    }

]


export const createAndSellNFT = [
    {
        id: 1,
        step : 'Step-1',
        icon : '/icons/step-1.svg',
        heading : 'Set up your wallet',
        content : 'Set up your wallet with BITSI and unlock powerful, easily customizable, and scalable features that make it stand out from the rest.'
    },
    {
        id: 2,
        step : 'Step-2',
        icon : '/icons/step-2.svg',
        heading : 'Add your NFTs',
        content : 'We have made the template fully responsive, so it looks great on all devices: desktop, tablets, and mobiles'
    } ,
    {
        id : 3,
        step : 'Step-3',
        icon : '/icons/step-3.svg',
        heading : 'Sell your NFTs',
        content : 'Sell your NFTs with ease on our platform. Our user-friendly interface and robust marketplace make it simple to sell.'
    }
]

export const myProfileNftOrderDropDownItems =  [
    {
        id : 1,
        name : 'Order By Loss',
        icon : '/icons/order-by-loss-my-profile-nft-table.svg'
    }
]

export const collectionDropDownItems = [
    {
        id : 1,
        name : 'Good',
        icon : '/icons/nft-good.svg'
    },
    {
        id : 2,
        name : 'Prestigious',
        icon : '/icons/nft-prestigious.svg'
    },
    {
        id : 3,
        name : 'Luxury',
        icon : '/icons/nft-luxury.svg'
    },
]

export const priceDropDownItems = [
    {
        id : 1,
        name : 'Low to High',
        icon : '/icons/descOrder.svg'
    },
    {
        id : 2,
        name : 'High to Low',
        icon : '/icons/aescOrder.svg'
    },
]  


export const orderDropDownItem = [
    {
        id : 2,
        name : 'Asc Order',
        icon : '/icons/low-high-logo.svg'
    },
    {
        id : 3,
        name : 'Desc Order',
        icon : '/icons/high-low-logo.svg'
    },
]

export const purchaseDropDownItem = [
    {id : 1,name : 'Uninsured Nfts',icon : ''},
    {id : 2,name : 'Uninsured Coins',icon : ''},
]


export const insuranceDropDownItemsMyProfile = [

    // {
    //     id : 1,
    //     name : 'Latest',
    //     icon : '/icons/descOrder.svg'
    // },
    {
        id : 1,
        name : 'Coin',
        icon : '/icons/coin-icon-userzone.svg'
    },
    {
        id : 2,
        name : 'Nft',
        icon : '/icons/nft-icon-userzone.svg'
    },
]

export const newBitsiNftDropDownItems = [
    {
        id : 1,
        name : 'Good',
        icon : '/icons/nft-good.svg'
    },
    {
        id : 2,
        name : 'Prestigious',
        icon : '/icons/nft-prestigious.svg'
    },
    {
        id : 3,
        name : 'Luxury',
        icon : '/icons/nft-luxury.svg'
    },
    {
        id : 4,
        name : 'Low to High',
        icon : '/icons/descOrder.svg'
    },
    {
        id : 5,
        name : 'High to Low',
        icon : '/icons/aescOrder.svg'
    },
    {
        id : 6,
        name : 'Asc Order',
        icon : '/icons/low-high-logo.svg'
    },
    {
        id : 7,
        name : 'Desc Order',
        icon : '/icons/high-low-logo.svg'
    },
]

export const listOfNFts = [
    {
        id: '1',
        nft_name : 'Girl looking',
        nft_price : 1,
        nft_image : '/icons/nft-girl-looking.svg',
        nft_collection_name : 'luxury'

    },
    {
        id : '2',
        nft_name : 'Wide Eyes',
        nft_price : 10,
        nft_image : '/icons/nft-wide-eyes.svg',
        nft_collection_name : 'good'
    },
    {
        id : '3',
        nft_name : 'HandGradient',
        nft_price : 2,
        nft_image : '/icons/nft-hand-gradient.svg',
        nft_collection_name : 'prestigious'
    },
    {
        id : '4',
        nft_name : 'Statue',
        nft_price : 22,
        nft_image : '/icons/nft-statue.svg',
        nft_collection_name : 'prestigious'
    },{
        id : '5',
        nft_name : 'Wide Eyes',
        nft_price : 10,
        nft_image : '/icons/nft-wide-eyes.svg',
        nft_collection_name : 'good'
    },
    {
        id: '6',
        nft_name : 'Girl looking',
        nft_price : 1,
        nft_image : '/icons/nft-wide-eyes.svg',
        nft_collection_name : 'luxury'

    },
    
    {
        id : '7',
        nft_name : 'Sample Video',
        nft_price : 2,
        nft_image : '/icons/nft-vid2.mp4',
        nft_collection_name : 'prestigious'
    },
    
    {
        id: '8',
        nft_name : 'Girl looking',
        nft_price : 1,
        nft_image : '/icons/nft-girl-looking.svg',
        nft_collection_name : 'luxury'

    },{
        id : '9',
        nft_name : 'Statue',
        nft_price : 22,
        nft_image : '/icons/nft-wide-eyes.svg',
        nft_collection_name : 'prestigious'
    },
    
    {
        id : '10',
        nft_name : 'HandGradient',
        nft_price : 2,
        nft_image : '/icons/nft-hand-gradient.svg',
        nft_collection_name : 'prestigious'
    },
    {
        id : '11',
        nft_name : 'Statue',
        nft_price : 22,
        nft_image : '/icons/nft-wide-eyes.svg',
        nft_collection_name : 'prestigious'
    },
    {
        id : '12',
        nft_name : 'Wide Eyes',
        nft_price : 10,
        nft_image : '/icons/nft-wide-eyes.svg',
        nft_collection_name : 'good'
    },
    {
        id: '13',
        nft_name : 'Girl looking',
        nft_price : 1,
        nft_image : '/icons/nft-vid.mp4',
        nft_collection_name : 'luxury'

    },
    {
        id : '14',
        nft_name : 'HandGradient',
        nft_price : 2,
        nft_image : '/icons/nft-hand-gradient.svg',
        nft_collection_name : 'prestigious'
    },
    {
        id : '15',
        nft_name : 'Wide Eyes',
        nft_price : 10,
        nft_image : '/icons/nft-wide-eyes.svg',
        nft_collection_name : 'good'
    },
    
    {
        id : '16',
        nft_name : 'Statue',
        nft_price : 22,
        nft_image : '/icons/nft-vid3.mp4',
        nft_collection_name : 'prestigious'
    }

]

export const listOfNFtsMyProfile = [
    {
        id: '1',
        name : 'NFT',
        price : 1,
        nftImg : '/icons/nft-my-profile.png',

    },
    {
        id : '2',
        name : 'NFT',
        price : 10,
        nftImg : '/icons/nft-vid.mp4',
    },
]

// heading , value , net
export const bitsiCoinCardData = [
    {
        id:1,
        heading : 'Price',
        value : '1 BTS = 14.65 ETH',
        net : 'profit'
    },
    {
        id:2,
        heading : 'Policy Coverage',
        value : '08.23 ETH',
        net : 'profit'
    },
    {
        id:3,
        heading : 'Price',
        value : '11.23 ETH',
        net : 'loss'
    }
]


export const filterOptions = ['Sales' , 'Transfers' , 'Random' , 'Test' , 'Sales' , 'Transfers' , 'Random' , 'Test' ,'Sales' , 'Transfers' , 'Random' , 'Test', 'Test1' , 'Transfers123' , 'Random12' , 'Test3'];

export const events = [
    { event: 'Transfer', price: '10 BITSI', from: 'crouton', to: 'ton', date: '1y ago' },
    { event: 'Transfer', price: '10 BITSI', from: 'crouton', to: 'ton', date: '1y ago' },
    { event: 'Mint', price: '10 BITSI', from: 'crouton', to: 'ton', date: '1y ago' },
  ];


  export const detailsTabData = {
    'Token Standard' : 'ERC-721',
    'Chain' : 'Polygon',
    'Last Updated' : '2 Months Ago',
  }


  export const tableMyWallet = [
    {Date : '11/01/24' , marketPlace : 'OpenSea' , nftId : '1234' , nftPrice : '5 ETH' , insurance : 'yes'  , incusranceCoverage : 'yes' , insuranceExpiry : '29/05/2024'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , nftId : '1234' , nftPrice : '5 ETH' , insurance : 'yes'  , incusranceCoverage : 'yes' , insuranceExpiry : '29/05/2024'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , nftId : '1234' , nftPrice : '5 ETH' , insurance : 'yes'  , incusranceCoverage : 'yes' , insuranceExpiry : '29/05/2024'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , nftId : '1234' , nftPrice : '5 ETH' , insurance : 'yes'  , incusranceCoverage : 'yes' , insuranceExpiry : '29/05/2024'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , nftId : '1234' , nftPrice : '5 ETH' , insurance : 'yes'  , incusranceCoverage : 'yes' , insuranceExpiry : '29/05/2024'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , nftId : '1234' , nftPrice : '5 ETH' , insurance : 'yes'  , incusranceCoverage : 'yes' , insuranceExpiry : '29/05/2024'},
    // {NFT : '/icons/table-nft-icon.png' , name : 'Minion Serious Eye' , insuranceExpiry : '11/01/2024 - 10:00 AM' , currentPrice : '1 BITSI' , nftMintedTime : '29/05/2024 - 14:22 PM' , active : true},
    // {NFT : '/icons/table-nft-icon.png' , name : 'Minion Serious Eye' , insuranceExpiry : '11/01/2024 - 10:00 AM' , currentPrice : '1 BITSI' , nftMintedTime : '29/05/2024 - 14:22 PM' , active : true},
    // {NFT : '/icons/table-nft-icon.png' , name : 'Minion Serious Eye' , insuranceExpiry : '11/01/2024 - 10:00 AM' , currentPrice : '1 BITSI' , nftMintedTime : '29/05/2024 - 14:22 PM' , active : true},
    // {NFT : '/icons/table-nft-icon.png' , name : 'Minion Serious Eye' , insuranceExpiry : '11/01/2024 - 10:00 AM' , currentPrice : '1 BITSI' , nftMintedTime : '29/05/2024 - 14:22 PM' , active : true},
    // {NFT : '/icons/table-nft-icon.png' , name : 'Minion Serious Eye' , insuranceExpiry : '11/01/2024 - 10:00 AM' , currentPrice : '1 BITSI' , nftMintedTime : '29/05/2024 - 14:22 PM' , active : true},
    // {NFT : '/icons/table-nft-icon.png' , name : 'Minion Serious Eye' , insuranceExpiry : '11/01/2024 - 10:00 AM' , currentPrice : '1 BITSI' , nftMintedTime : '29/05/2024 - 14:22 PM' , active : true},
  ]
  export const tableInsurance = [
    {Date : '11/01/24' , Asset : 'Coin' , EventName : 'Published' , insuranceCoverage : 'YES' , insuraceExpiry : '11/01/2025'},
    {Date : '11/01/24' , Asset : 'Coin' , EventName : 'Extend' , insuranceCoverage : 'YES' , insuraceExpiry : '11/01/2025'},
    {Date : '11/01/24' , Asset : 'Coin' , EventName : 'Upgrade' , insuranceCoverage : 'YES' , insuraceExpiry : '11/01/2025'},
    {Date : '11/01/24' , Asset : 'Coin' , EventName : 'Claim' , insuranceCoverage : 'YES' , insuraceExpiry : '11/01/2025'},
    {Date : '11/01/24' , Asset : 'Coin' , EventName : 'Published' , insuranceCoverage : 'YES' , insuraceExpiry : '11/01/2025'},
   
    
  ]

  export const tableMyInsurance = [
    {Date : '11/01/24' , marketPlace : 'OpenSea' , ID : '12345' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'No' , insuranceCOverage : 'Yes' , insuranceExpiry : '-'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , ID : '12345' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'No' , insuranceCOverage : 'Yes' , insuranceExpiry : '-'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , ID : '12345' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'No' , insuranceCOverage : 'Yes' , insuranceExpiry : '-'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , ID : '12345' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'No' , insuranceCOverage : 'Yes' , insuranceExpiry : '-'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , ID : '12345' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'No' , insuranceCOverage : 'Yes' , insuranceExpiry : '-'},
    
  ]

  export const tableMyInsuraceCoin = [
    {Date : '11/01/24' , marketPlace : 'OpenSea' , ID : '12345' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'Yes' , insuranceCOverage : 'Yes' , insuranceExpiry : '-'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , ID : '12345' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'Yes' , insuranceCOverage : 'Yes' , insuranceExpiry : '-'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , ID : '12345' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'Yes' , insuranceCOverage : 'Yes' , insuranceExpiry : '-'},
  ]

  export const tableMyHistory = [
    {Date : '11/01/24' ,marketplace : 'opensea', ID : '102344' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'yes' , insuranceCoverage : 'yes' , insuraceExp : '11/02/2024'},
    {Date : '11/01/24' ,marketplace : 'opensea', ID : '102344' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'yes' , insuranceCoverage : 'yes' , insuraceExp : '11/02/2024'},
    {Date : '11/01/24' ,marketplace : 'opensea', ID : '102344' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'yes' , insuranceCoverage : 'yes' , insuraceExp : '11/02/2024'},
    {Date : '11/01/24' ,marketplace : 'opensea', ID : '102344' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'yes' , insuranceCoverage : 'yes' , insuraceExp : '11/02/2024'},
    {Date : '11/01/24' ,marketplace : 'opensea', ID : '102344' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'yes' , insuranceCoverage : 'yes' , insuraceExp : '11/02/2024'},
    {Date : '11/01/24' ,marketplace : 'opensea', ID : '102344' , eventName : 'Sold' , Price : '5 ETHR' , insured : 'yes' , insuranceCoverage : 'yes' , insuraceExp : '11/02/2024'},
    // {Date : '11/01/24' , ID : '102344' , Name : 'Mininon Serious Eye' , Collection : 'Luxury' , Price : '1 BITSI' , Acions : 'Purchased' , MarketPlace : 'Opensea' , PriceDifference : '3 BITSI' , Compensation :'N/A'},
    // {Date : '11/01/24' , ID : '102344' , Name : 'Mininon Serious Eye' , Collection : 'Luxury' , Price : '1 BITSI' , Acions : 'Purchased' , MarketPlace : 'Opensea' , PriceDifference : '3 BITSI' , Compensation :'N/A'},
    // {Date : '11/01/24' , ID : '102344' , Name : 'Mininon Serious Eye' , Collection : 'Luxury' , Price : '1 BITSI' , Acions : 'Purchased' , MarketPlace : 'Opensea' , PriceDifference : '3 BITSI' , Compensation :'N/A'},
    // {Date : '11/01/24' , ID : '102344' , Name : 'Mininon Serious Eye' , Collection : 'Luxury' , Price : '1 BITSI' , Acions : 'Purchased' , MarketPlace : 'Opensea' , PriceDifference : '3 BITSI' , Compensation :'N/A'},
    // {Date : '11/01/24' , ID : '102344' , Name : 'Mininon Serious Eye' , Collection : 'Luxury' , Price : '1 BITSI' , Acions : 'Purchased' , MarketPlace : 'Opensea' , PriceDifference : '3 BITSI' , Compensation :'N/A'},
  ]
  export const tableAdminViewAndAnalysis = [
    {Date : '11/01/24' , NFTID : '102344' , Name : 'Mininon Serious Eye' , Collection : 'Luxury' , Price : '1 BITSI' , Acions : 'Purchased' , MarketPlace : 'Opensea' , PriceDifference : '3 BITSI' , marketplace :'N/A'},
    {Date : '11/01/24' , NFTID : '102344' , Name : 'Mininon Serious Eye' , Collection : 'Luxury' , Price : '1 BITSI' , Acions : 'Purchased' , MarketPlace : 'Opensea' , PriceDifference : '3 BITSI' , marketplace :'N/A'},
    {Date : '11/01/24' , NFTID : '102344' , Name : 'Mininon Serious Eye' , Collection : 'Luxury' , Price : '1 BITSI' , Acions : 'Purchased' , MarketPlace : 'Opensea' , PriceDifference : '3 BITSI' , marketplace :'N/A'},
    {Date : '11/01/24' , NFTID : '102344' , Name : 'Mininon Serious Eye' , Collection : 'Luxury' , Price : '1 BITSI' , Acions : 'Purchased' , MarketPlace : 'Opensea' , PriceDifference : '3 BITSI' , marketplace :'N/A'},
    {Date : '11/01/24' , NFTID : '102344' , Name : 'Mininon Serious Eye' , Collection : 'Luxury' , Price : '1 BITSI' , Acions : 'Purchased' , MarketPlace : 'Opensea' , PriceDifference : '3 BITSI' , marketplace :'N/A'},
    {Date : '11/01/24' , NFTID : '102344' , Name : 'Mininon Serious Eye' , Collection : 'Luxury' , Price : '1 BITSI' , Acions : 'Purchased' , MarketPlace : 'Opensea' , PriceDifference : '3 BITSI' , marketplace:'N/A'},
  ]

  export const tableMyCompensation = [
    {requestDate : '11/01/24' , Asset : 'Coin' , confirmDate : '12/01/2024 - Declined' , lossToCompensate : '44%' , actAmtCom : '-'},
    {requestDate : '11/01/24' , Asset : 'Coin' , confirmDate : '12/01/2024 - Declined' , lossToCompensate : '44%' , actAmtCom : '-'},
    {requestDate : '11/01/24' , Asset : 'Coin' , confirmDate : '12/01/2024 - Declined' , lossToCompensate : '44%' , actAmtCom : '-'},
    {requestDate : '11/01/24' , Asset : 'Coin' , confirmDate : '12/01/2024 - Declined' , lossToCompensate : '44%' , actAmtCom : '-'},
    {requestDate : '11/01/24' , Asset : 'Coin' , confirmDate : '12/01/2024 - Declined' , lossToCompensate : '44%' , actAmtCom : '-'},
    {requestDate : '11/01/24' , Asset : 'Coin' , confirmDate : '12/01/2024 - Declined' , lossToCompensate : '44%' , actAmtCom : '-'},
    
  ]
  export const tableAdminWallets = [
    {walletId : '12345' , walletType : 'Main Wallet'},
    {walletId : '12345' , walletType : 'Main Wallet'},
    {walletId : '12345' , walletType : 'Broker Wallet'},
  ]

  export const tableAdminCompensation = [
    {date : '11/01/24' ,username : 'user123' , loss : '1 BITSI' , compensationAmount : '7 BITSI'},
    {date : '11/01/24' ,username : 'user123' , loss : '1 BITSI' , compensationAmount : '7 BITSI'},
    {date : '11/01/24' ,username : 'user123' , loss : '1 BITSI' , compensationAmount : '7 BITSI'},
    {date : '11/01/24' ,username : 'user123' , loss : '1 BITSI' , compensationAmount : '7 BITSI'},
    {date : '11/01/24' ,username : 'user123' , loss : '1 BITSI' , compensationAmount : '7 BITSI'},
    {date : '11/01/24' ,username : 'user123' , loss : '1 BITSI' , compensationAmount : '7 BITSI'},
  ]

  export const tableMyWalletCoin = [
    // {COIN : 'Afdsfdsd' , Name : 'Coin' , TransactionId : '1234' , Price : 'sd' , PurchasedDate : '29/05/2024 - 14:22 PM'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , CoinId : '1234' , coinPrice : '5 ETH' , insurance : 'yes'  , incusranceCoverage : 'yes' , insuranceExpiry : '29/05/2024'},
    {Date : '11/12/24' , marketPlace : 'OpenSea' , CoinId : '2234' , coinPrice : '2 ETH' , insurance : 'yes'  , incusranceCoverage : 'yes' , insuranceExpiry : '29/05/2024'},
    {Date : '04/01/24' , marketPlace : 'OpenSea' , CoinId : '4434' , coinPrice : '3 ETH' , insurance : 'yes'  , incusranceCoverage : 'yes' , insuranceExpiry : '29/05/2024'},
    {Date : '12/01/24' , marketPlace : 'OpenSea' , CoinId : '1233' , coinPrice : '3 ETH' , insurance : 'yes'  , incusranceCoverage : 'yes' , insuranceExpiry : '29/05/2024'},
    {Date : '11/01/24' , marketPlace : 'OpenSea' , CoinId : '1234' , coinPrice : '5 ETH' , insurance : 'yes'  , incusranceCoverage : 'yes' , insuranceExpiry : '29/05/2024'}
    // {COIN : 'A' , Name : 'Coin' , TransactionId : '1234' , Price : 'sd' , PurchasedDate : '29/05/2024 - 14:22 PM'},
    // {COIN : 'A' , Name : 'Coin' , TransactionId : '1234' , Price : 'sd' , PurchasedDate : '29/05/2024 - 14:22 PM'},
    // {COIN : 'A' , Name : 'Coin' , TransactionId : '1234' , Price : 'sd' , PurchasedDate : '29/05/2024 - 14:22 PM'},
    // {COIN : 'A' , Name : 'Coin' , TransactionId : '1234' , Price : 'sd' , PurchasedDate : '29/05/2024 - 14:22 PM'},
    // {COIN : 'A' , Name : 'Coin' , TransactionId : '1234' , Price : 'sd' , PurchasedDate : '29/05/2024 - 14:22 PM'},
  ]


  export const topSellers = [
    {id: 1, Name : "Sowmya", Metic : "3.3", icon : "profile-icon1"},
    {id: 2, Name : "Nitish Ready", Metic : "3.3", icon : "profile-icon2"},
    {id: 3, Name : "Alexander", Metic : "3.3", icon : "profile-icon3"},
    {id: 4, Name : "Sowmya", Metic : "3.3", icon : "profile-icon4"},
    {id: 5, Name : "Sowmya", Metic : "3.3", icon : "profile-icon5"},
    {id: 6, Name : "Sowmya", Metic : "3.3", icon : "profile-icon2"},
    {id: 7, Name : "Sowmya", Metic : "3.3", icon : "profile-icon3"},
    {id: 8, Name : "Sowmya", Metic : "3.3", icon : "profile-icon1"},
    {id: 9, Name : "Sowmya", Metic : "3.3", icon : "profile-icon5"},
    {id: 10, Name : "Sowmya", Metic : "3.3", icon : "profile-icon2"},
    {id: 11, Name : "Sowmya", Metic : "3.3", icon : "profile-icon3"},
    {id: 12, Name : "Sowmya", Metic : "3.3", icon : "profile-icon4"},
  ]

  export const myProfileWalletDropDown = [
    {
        id: 1,
        name : 'NFTs',
        icon : '/icons/nft-icon-userzone.svg'
    },
    {
        id: 2,
        name : 'Coin',
        icon : '/icons/coin-icon-userzone.svg'
    },
    // {
    //     id: 3,
    //     name : 'Collections',
    //     icon : '/icons/streamline_insurance-hand-solid.svg'
    // }
  ]
  export const myHistoryWalletDropDown = [
    {
        id: 1,
        name : 'Coins',
        icon : '/icons/coin-icon-userzone.svg'
    },
    {
        id: 2,
        name : 'NFT',
        icon : '/icons/nft-icon-userzone.svg'
    },
    {
        id: 3,
        name : 'Protection',
        icon : '/icons/incusrance-icon-userzone.svg'
    }
  ]

  export const myInsuranceDropdown = [
    {id: 1,name : 'Purchase' , icon : ""}, {id: 2,name : 'Upgrade' , icon : ""}, {id: 3,name : 'Extend' , icon : ""} , 
    {id: 4,name : 'Claim' , icon : ""} , {id: 5,name : 'Unlock' , icon : ""}
  ]

  export const buycollectionsTable = [
    {Collections : 'Luxury' , NFT : '16' , price : '23'},
    {Collections : 'Luxury' , NFT : '16' , price : '23'},
    {Collections : 'Luxury' , NFT : '16' , price : '23'},
    {Collections : 'Luxury' , NFT : '16' , price : '23'},
  ]



export const nftMintingDropDown = [
    {
        id : 1, 
        name : 'Compensation Wallet',
        icon : ''
    },
    {
        id : 2, 
        name : 'Marketplace Wallet',
        icon : ''
    },
    {
        id : 3, 
        name : 'Broker Wallet',
        icon : ''
    },
    {
        id : 4, 
        name : 'Main Wallet',
        icon : ''
    }
]


export const heroHomeVideos = [
    {vidSrc : "https://res.cloudinary.com/djdrlor2w/video/upload/v1721975440/bitsi_new_vid_bbp4po.mp4"},
    {vidSrc : "https://res.cloudinary.com/djdrlor2w/video/upload/v1721975440/bitsi_new_vid_bbp4po.mp4"},
    {vidSrc : 'https://res.cloudinary.com/djdrlor2w/video/upload/v1721975440/bitsi_new_vid_bbp4po.mp4'}
]


export const faqs = [
    {
        question : 'How does BITSI’s protection plan work?',
        answer : 'BITSI’s protection plan offers coverage by setting aside funds in a secure protection pool. When you activate coverage, a portion of your BITSI investment is safeguarded. You can manage, extend, or upgrade this coverage through your user zone, ensuring that your investments are protected against market volatility and unforeseen risks.'
    },
    {
        question : 'What happens during a price drop?',
        answer : 'test answer',
    },
    {
        question : ' How do I buy BITSI?',
        answer : 'test answer',
    },
    {
        question : 'What’s the difference between total and circulating supply?',
        answer : 'test answer',
    },
    {
        question : 'How does BITSI’s price change over time?',
        answer : 'test answer',
    },
]

export const homeHowCryptoWorks = [
    {
        heading : 'Acquire BITSI',
        description : 'Acquire BITSI– Purchase BITSI coins directly from our platform or through our trusted exchange partners.',
        btns :[{
            label : 'Binance',
            // icon : '/icons/binance.svg',
            url : 'https://www.binance.com/',
            tailwindClassName : 'text-[#F0B90B] bg-white'} ,
            {
                label : 'CoinBase', url : 'https://www.binance.com/', tailwindClassName : 'text-[#0667D0] bg-white'
            },{
                 label : 'Uniswap', url : 'https://www.binance.com/', tailwindClassName : 'text-pink-600 bg-white'
            } ]
    },
    {
        heading : 'Connect You Wallet',
        description : 'Acquire BITSI– Purchase BITSI coins directly from our platform or through our trusted exchange partners.',
        btns :[{
            label : 'Connect',url : '', tailwindClassName : 'text-transparent bg-gradient-to-r from-[#F9AD09] to-[#B19804] bg-clip-text'
        }]
    },
    {
        heading : 'Access Your Protection Zone',
        description : 'Acquire BITSI– Purchase BITSI coins directly from our platform or through our trusted exchange partners.',
        btns :[{
            label : 'Connect',url : '', tailwindClassName : 'text-transparent bg-gradient-to-r from-[#F9AD09] to-[#B19804] bg-clip-text'
        }]
    },
]

export const coinFaqs = faqs;


export const homeBitsiSteps = [
    {
        primary : 'Comprehensive Protection',
        secondary : 'Unique security in a fluctuating market.'
    },
    {
        primary : ' Transparent Metrics',
        secondary : 'Real-time updates on price, supply, and protection pool.'
    },
    {
        primary : 'SteadyGrowth Focus',
        secondary : 'Designed for investors who value stability and long-term growth.'
    }
]

export const coinMaketTable = [
    {platform : 'Binance',type : 'Exchange' , price : 12.59 , scale : 4.35 , link : '' , redirect : false},
    {platform : 'Coinbase',type : 'Exchange' , price : 12.45 , scale : 4.35 , link : '' , redirect  : false},
    {platform : 'Kraken',type : 'Broker' , price : 12.55 , scale : -2.35 , link : '' , redirect : false},
    {platform : 'Uniswap',type : 'Exchange' , price : 12.22 , scale : 4.35 , redirect : true,  link : 'https://app.uniswap.org/explore/tokens/polygon/0x628211398e10a014826bc7d943a39b2ce6126d72'},
    {platform : 'BITSI Telegram',type : 'DEX' , price : 12.44 , scale : -1.35 , redirect : false, link : '' , },
    {platform : 'Binance',type : 'Exchange' , price : 12.53 , scale : 4.35 , redirect : false, link : '' , },
    {platform : 'BITSI',type : 'SWAP' , price : 12.45 , scale : 4.35 , redirect : false, link : '' ,},
    
]

export const coinBoxBuy = [
    {key:'Vol', value:'113.3B'},
    {key : 'Market Cap' , value : '1.49T'},
    {key : 'Day’s Range' , value : '69,323 - 76,007.7'},
    {key : '52 WK Range' , value : '34,984.3 - 75,642.3'},
    {key : 'Max Supply' , value : 'BTC21.00M'},
    {key : 'Circulating Supply' , value : 'BTC19.78M'},
]

export const coinKeyFeatures = [
    {
        key : 'Protection Mechanism',value : 'A unique mechanism providing BITSI holders with an additional layer of security through compensation in case of a sale loss, when the sale price is lower than the purchase price, thereby enhancing investment stability',
        howItWorks : [
            {heading : 'Real-Time Price Monitoring:' , data : ' The system continuously monitors the market price of BITSI.'},
            {heading : 'Dedicated Compensation Fund:' , data : ' A portion of revenues is allocated to a special fund designated for compensating holders during price declines. This fund acts as a safety net to ensure compensation can be provided when needed. The capital in the fund is held in stablecoins and/or fiat currency.'},
            {heading : 'Smart Contract Activation:' , data : ' When the sale price of BITSI is lower than the purchase price, the smart contract is automatically triggered to initiate a compensation transfer. The customer submits a compensation request, and the funds are transferred to the customer’s wallet within a month, subject to admin approval. Compensation can be provided in additional BITSI tokens or stablecoins, according to predefined terms.'}
        ]
    },
    {
        key : 'Long-Term Growth Potential' , value : 'The goal is steady and sustainable growth, making it an attractive choice for investors seeking stability and effective risk management',
        howItWorks : [
            {heading : 'Controlled Release of Tokens to the Market:' , data : ' BITSIAAA aims for controlled growth rather than extreme price fluctuations. One method used is careful management of the token supply in the market to maintain a balance between supply and demand, thereby reducing volatility.'},
            {heading : 'Incentives for Holding::' , data : ' The system encourages long-term holding by offering reduced fees and the option to upgrade protection levels whenever BITSI’s value increases. This approach contributes to stability and attracts investors looking for steady growth with reduced risk.'},
            {heading : 'Risk Management:' , data : ' The commitment to long-term growth reflects a strategic approach focused on controlled growth, built on clear economic models and continuous risk management. This makes BITSI an appealing option for investors seeking a safe and stable investment.'}
        ]
    },
    {
        key : 'Growth Protection' , value : 'Enables the protection of BITSI investors profits resulting from the growth of the BITSI token, allowing investors to preserve the value of their investment and growth even in volatile market conditions.',
        howItWorks : [
            {heading : 'Securing accumulated profits:' , data : ' When BITSI holders experience growth in their profits, they can enhance their level of protection to cover both their investment and profits, ensuring these remain safeguarded even during market downturns, thanks to growth protection mechanisms.'},
            {heading : 'Volatility Reduction Mechanisms:' , data : ' BITSIAAA has a dedicated mechanism that activates during sharp declines, utilizing tools to increase demand in times of steep price drops. Additionally, the protection mechanism helps prevent panic selling by providing compensation, contributing to market stability, reducing fear of value loss, and preserving accumulated profits'},
            {heading : 'Building Trust:' , data : ' The growth protection mechanism provides investors with a sense of security that supports the value of their investment over time, even during periods of volatility. This way, investors choose to invest in and hold BITSI, knowing it is equipped with mechanisms to preserve its value.'}
        ]
    }
]

export const countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad Tobago","Tunisia","Turkey","Turkmenistan","Turks Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];