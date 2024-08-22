// import type { NextApiRequest, NextApiResponse } from 'next'
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import { getCsrfToken } from 'next-auth/react'
// import { SiweMessage } from 'siwe'

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   const providers = [
//     CredentialsProvider({
//       name: 'Ethereum',
//       credentials: {
//         message: {
//           label: 'Message',
//           type: 'text',
//           placeholder: '0x0',
//         },
//         signature: {
//           label: 'Signature',
//           type: 'text',
//           placeholder: '0x0',
//         },
//       },
//       async authorize(credentials) {
//         try {
//           if (!process.env.NEXTAUTH_URL) {
//             throw 'NEXTAUTH_URL is not set'
//           }
//           // the siwe message follows a predictable format
//           const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'))
//           const nextAuthUrl = new URL(process.env.NEXTAUTH_URL)
//           if (siwe.domain !== nextAuthUrl.host) {
//             return null
//           }
//           // validate the nonce
//           if (siwe.nonce !== (await getCsrfToken({ req }))) {
//             return null
//           }
//           // siwe will validate that the message is signed by the address 
//           await siwe.validate(credentials?.signature || '')
//           return {
//             id: siwe.address,
//           }
//         } catch (e) {
//           return null
//         }
//       },
//     }),
//   ]

//   const isDefaultSigninPage =
//     req.method === 'GET' && req.query.nextauth.includes('signin')

//   if (isDefaultSigninPage) {
//     providers.pop()
//   }

//   return await NextAuth(req, res, {
//     providers,
//     session: {
//       strategy: 'jwt',
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     callbacks: {
//       // after a user is logged in, we can keep the address in session
//       async session({ session, token }) {
//         session.address = token.sub
//         session.user!.name = token.sub
//         return session
//       },
//     },
//   })
// }