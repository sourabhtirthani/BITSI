'use client'
import { UserContextProps } from '@/types'
import { createContext, useContext , ReactNode, useState} from 'react'
// currently contains the symbol only for the user currency
const CurrencyContext = createContext<UserContextProps | undefined>(undefined);

export const CurrencyProvider = ({children} : {children : ReactNode}) => {
    const [currencyOfUser , setCurrencyOfUser] = useState('');
    const [valueInTheUserSpecifedCurrency , setValueInTheUserSpecifedCurrency] = useState<number>(0);
    return (
    <CurrencyContext.Provider value={{currencyOfUser , setCurrencyOfUser ,valueInTheUserSpecifedCurrency , setValueInTheUserSpecifedCurrency}}>
        {children}
    </CurrencyContext.Provider>
    );
}

export const useCurrencyContext = ()=>{
    const context = useContext(CurrencyContext);
    if(!context){
        throw new Error("useCurrency must be used within a CreditProvider");
    }
    return context;
}