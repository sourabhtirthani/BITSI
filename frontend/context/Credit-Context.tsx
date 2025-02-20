'use client'
import { CreditContextProps } from '@/types'
import { createContext, useContext , ReactNode, useState} from 'react'

const CreditContext = createContext<CreditContextProps | undefined>(undefined);

export const CreditProvider = ({children} : {children : ReactNode}) => {
    const [creditScore, setCreditScore] = useState(-1);
    const [refreshCreditScore, setRefreshCreditScore] = useState(false);
    return (
    <CreditContext.Provider value={{creditScore , setCreditScore , refreshCreditScore , setRefreshCreditScore}}>
        {children}
    </CreditContext.Provider>
    );
}

export const useCreditContext = ()=>{
    const context = useContext(CreditContext);
    if(!context){
        throw new Error("useCreditContext must be used within a CreditProvider");
    }
    return context;
}