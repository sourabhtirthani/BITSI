'use client'
import { AboutUsContextType } from "@/types";
import React, { createContext, useContext, useState } from "react"
// this code is currently not being used anywhere
const AboutUsContext = createContext<any>(undefined);

export function AboutUsProvider({children} : {children : React.ReactNode}){
    const [filterValue , setFilterValue] = useState<string>('abcdefghijklmnop')
    return (
        <AboutUsContext.Provider value={{filterValue , setFilterValue}}>
            {children}
        </AboutUsContext.Provider>
    )
}

export function useAboutUsContext(){
    const context = useContext(AboutUsContext);
    return context;
}