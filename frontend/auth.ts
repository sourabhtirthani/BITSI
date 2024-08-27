import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialProvider from 'next-auth/providers/credentials'
import db from "@/db";
import { compare } from "bcryptjs";
import { sendOtpToAdmin } from "./lib/sendEmails";
import { v4 as uuidv4 } from 'uuid';
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [CredentialProvider({
    name : "Credentials",
    credentials : {
      email : {
        label : "Email",
        type : "email"
      },
      password : {label : "Password" , type : "password"}
    },
    authorize: async (credentials)=>{
      const email =credentials.email as  string;
      const password = credentials.password as string;
      if(!email || !password){
        throw new CredentialsSignin("Please enter your email and password")
      }
      const user = await db.admin.findUnique({
        where : {email : email}
      })
      if(!user){
        throw new CredentialsSignin("Invalid details")
      }else{  
        const isMatched = await compare(password , user.password);
        if(!isMatched){
          throw new CredentialsSignin("Invalid details")
        }else{
          const idOfOtp  = uuidv4();
          // const sendMail = await sendOtpToAdmin(email , idOfOtp)
          return {email : user.email}
        }
      }
    }
  })],
  // , pages: {
  //   signIn: '/admin',
  // },
  // session: {
  //   strategy: 'jwt',
  // },
  
})