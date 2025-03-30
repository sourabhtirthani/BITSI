import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialProvider from 'next-auth/providers/credentials'
import { validateAdminPassword, validateOtp } from "./actions/uploadNft";
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [CredentialProvider({
    name : "Credentials",
    credentials : {
      email : {
        label : "Email",
        type : "email"
      },
      password : {label : "Password" , type : "password"},
      otp : {label : "otp" , type : "text"}
    },
    authorize: async (credentials)=>{
      const email =credentials.email as  string;
      const password = credentials.password as string;
      const otp = credentials.otp as string
      if(!email || !password || !otp){
        throw new CredentialsSignin("Please enter your email and password")
      }
      const res = await validateAdminPassword(email , password);
      const otpRes = await validateOtp(otp , email)
      if(res.success == true && otpRes.success == true){
        return {email : email}
      }else{
        throw new CredentialsSignin("Invalid details")
      }
      // const user = await db.admin.findUnique({
      //   where : {email : email}
      // })
      // if(!user){
      //   throw new CredentialsSignin("Invalid details")
      // }else{  
      //   const isMatched = await compare(password , user.password);
      //   if(!isMatched){
      //     throw new CredentialsSignin("Invalid details")
      //   }else{
      //     const idOfOtp  = uuidv4();
      //     // const sendMail = await sendOtpToAdmin(email , idOfOtp)
      //     return {email : user.email}
      //   }
      // }
    }
  })],
  // , pages: {
  //   signIn: '/admin',
  // },
  // session: {
  //   strategy: 'jwt',
  // },
  
})