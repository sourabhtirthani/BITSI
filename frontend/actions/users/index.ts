'use server'
import db from "@/db";

type GeneralTypeForACtions = {success : boolean}
export const approveUserAsInvestor = async(id : number) : Promise<GeneralTypeForACtions>=>{
    try{
        await db.user.update({
            where : {
                id
            },
            data : {
                investorStatus : "Approved",
                isInvestor : true
            }
        })
        return {success : true}
    }catch(error){
        return {success : false}
    }
}

export const rejectUserAsInvestor = async(id : number) : Promise<GeneralTypeForACtions>=>{
    try{
        await db.user.update({
            where : {
                id
            },
            data : {
                investorStatus : "Rejected"
            }
        })
        return {success : true}
    }catch(error){
        return {success : false}
    }
}