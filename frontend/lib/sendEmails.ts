'use server'
import { Resend } from 'resend';
import { ClaimTemplate } from '@/components/emails/ClaimTemplate';



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