'use server'
import db from "@/db";

type GeneralTypeForACtions = {success : boolean}

export const addNewCurrency = async(code : string, currency : string) : Promise<GeneralTypeForACtions>=>{
    try{
        await db.supportTedCurrencies.create({
            data : {
                code : code,
                currency : currency,
                createdAt : new Date()
            }
        })
        return {success : true}
    }catch(error){

        return {success : false};
    }
}

export const deleteCurrency = async(id : number) : Promise<GeneralTypeForACtions>=>{
    try{
        await db.supportTedCurrencies.delete({
            where : {
                id
            }
        })
        return {success : true}
    }catch(error){
        return {success : false}
    }
}