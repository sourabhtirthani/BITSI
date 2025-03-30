'use server'
import db from "@/db";
import { sendWelcomeEmailToInvestor } from "@/lib/sendEmails";

type GeneralTypeForACtions = { success: boolean }
export const approveUserAsInvestor = async (id: number): Promise<GeneralTypeForACtions> => {
    try {
        const user = await db.user.update({
            where: {
                id
            },
            data: {
                investorStatus: "Approved",
                isInvestor: true
            }
        })
        await sendWelcomeEmailToInvestor(user.email ?? '', user.walletAddress ?? '', user.name ?? '');
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}

export const rejectUserAsInvestor = async (id: number): Promise<GeneralTypeForACtions> => {
    try {
        await db.user.update({
            where: {
                id
            },
            data: {
                investorStatus: "Rejected"
            }
        })
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}

export const increaseCreditScore = async (address: string, creditScore: number): Promise<GeneralTypeForACtions> => {
    try {
        console.log(`in the credit score `)
        const currentCreditScore = await db.user.findUnique({
            where: {
                walletAddress: address
            },
            select: {
                creditScore: true
            }
        })
        if (currentCreditScore) {
            await db.user.update({
                where: {
                    walletAddress: address
                },
                data: {
                    creditScore: creditScore + currentCreditScore?.creditScore
                }
            })
        }
        else {
            await db.user.create({
                data: {
                    walletAddress: address,
                    creditScore: creditScore,
                }
            })
        }
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}