'use server'
import { Resend } from 'resend';
import { ClaimTemplate } from '@/components/emails/ClaimTemplate';
import { OtpTemplate } from '@/components/emails/OtpTemplate';
import { saveOtpToDb } from '@/actions/uploadNft';
import { InvestorWelcomeTemplate } from '@/components/emails/InvestorWelcomeTemplate';


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendClaimAcceptRejectEmail = async (userMail: string, claimStatus: string, assetId: number, userName: string): Promise<any> => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: userMail,
            subject: `Update on Your Compensation Claim - [Asset ID: ${assetId}]`,
            react: ClaimTemplate({ userName: userName, assetId: assetId, claimStatus: claimStatus }),
        });
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

type sendOtpType = { success: Boolean }
export const sendOtp = async (emailAddress: string): Promise<sendOtpType> => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        console.log(otp, " otpotpotp")

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: emailAddress,
            subject: `OTP for secure access`,
            react: OtpTemplate({ otp: otp })
        });
        await saveOtpToDb(otp, emailAddress);
        return { success: true }
    } catch (error) {
        console.log('error sending mail for admin otp error');
        return { success: false };
    }
}
type SendWelcomeEmailToInvestorType = { success: Boolean }
export const sendWelcomeEmailToInvestor = async (emailAddress: string, address: string, name: string): Promise<SendWelcomeEmailToInvestorType> => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: emailAddress,
            subject: `Welcome to BITSI Crypto`,
            react: InvestorWelcomeTemplate({ name: name, address: address })
        });
        console.log(data);
        return { success: true }
    } catch (error) {
        console.log('error sending mail for admin otp error');
        console.log(error);
        return { success: false }
    }
}