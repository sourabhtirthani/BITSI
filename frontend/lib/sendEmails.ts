'use server'
import { Resend } from 'resend';
import { ClaimTemplate } from '@/components/emails/ClaimTemplate';
import { OtpTemplate } from '@/components/emails/OtpTemplate';
import {hash} from 'bcryptjs'
import { saveOtpToDb } from '@/actions/uploadNft';


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendClaimAcceptRejectEmail = async(userMail : string, claimStatus : string , assetId : number , userName : string) : Promise<any>=>{
    try{
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: userMail,
            subject: `Update on Your Compensation Claim - [Asset ID: ${assetId}]`,
            react: ClaimTemplate({ userName: userName , assetId : assetId , claimStatus : claimStatus }),
          });
          return {success : true};
    }catch(error){
        console.log(error);
        return {success : false}
    }
}

type sendOtpToAdminType = {success : Boolean}
export const sendOtpToAdmin = async(emailAddress :string , idOfOtp : string) : Promise<sendOtpToAdminType>=>{
    try{
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await hash(otp, 10);
        await saveOtpToDb(hashedOtp, emailAddress, idOfOtp);
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: emailAddress,
            subject: `OTP for secure access`,
            react: OtpTemplate({otp : 123})
          });
        return {success : true}
    }catch(error){
        console.log('error sending mail for admin otp error');
        return {success : false};
    }
}