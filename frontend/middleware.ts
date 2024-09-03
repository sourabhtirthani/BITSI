
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  // console.log("in the middleware funciton")
  const isAuthenticated = !!req.auth;
	const { nextUrl } = req;
  // console.log('isauthenticate'  , isAuthenticated)
  // if(req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname === '/admin' && !isAuthenticated){
  //       console.log(req.nextUrl.pathname)
  //       console.log('this is the admin home ');
  //       return Response.redirect(new URL('/admin', nextUrl));
  //     }
  if(req.nextUrl.pathname.startsWith('/admin') && !isAuthenticated){
    return Response.redirect(new URL('/admin', nextUrl));
  }
 
});

export const config = {
  matcher: ['/admin/compensation' , '/api/admin/:path*' , '/admin/analytic-dashboard' , '/admin/wallet-management' , '/admin/prices'
    , '/admin/minting' , '/admin/nft-minting', '/admin/coin-minting', '/admin/coin-insurance', '/admin/nft-insurance', '/admin/views-and-analysis' , '/admin/coin-parameters'
  ], 
};
// export const config = {
//   matcher: [ '/admin/nft-minting'
//   ], 
// };



// // import { NextRequest, NextResponse } from 'next/server';
// // import  { auth } from "@/auth"
// // import { getToken } from 'next-auth/jwt';

// // export async function middleware(request : NextRequest) {
// //   const { pathname } = request.nextUrl;
// //   if (pathname.startsWith('/admin/')) {
// //     const isAuthenticated = true;
// //     if(process.env.NEXTAUTH_SECRET != undefined){
// //     // const token = await getToken({ req: request , secret: process.env.NEXTAUTH_SECRET  });
// //     }
// //     if (!isAuthenticated) {
// //       return NextResponse.redirect(new URL('/protection', request.url));
// //     }
// //   }
  
// //   return NextResponse.next();
// // }
// export const config = {
//   matcher: ['/admin/:path*'], 
// };

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import {auth  } from './auth'

// export async function middleware(req: NextRequest) {
//   if(req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname === '/admin'){
//     console.log(req.nextUrl.pathname)
//     console.log('this is the admin home ');
//     return NextResponse.next();
//   }
//   //  const res = auth()
//   //  console.log(res)
// //  console.log('in herer')
//   const isAuthenticated = !!req.auth;
// console.log(isAuthenticated)
// console.log(`the authecaed is : ${isAuthenticated}`)
//   console.log(req.nextUrl.pathname)
//   const token = await getToken({req , secret : process.env.AUTH_SECRET as string  ,salt : 'fdfds'});
//   console.log('the toke is ')
//   console.log(token)
//   const url = req.nextUrl.clone();

//   // If the user is authenticated, allow access to admin pages
//   if (token) {
//     if (url.pathname.startsWith('/admin') && url.pathname !== '/admin') {
//       // Allow access to /admin/* pages if authenticated
//       return NextResponse.next();
//     }
//   }

//   // Redirect unauthenticated users to the login page for protected routes
//   // if (url.pathname.startsWith('/admin')) {
//   //   // Redirect to /admin if not authenticated
//   //   return NextResponse.redirect(new URL('/admin', req.url));
//   // }

//   // Allow access to public pages
//   return NextResponse.next();
// }


// // import { auth } from "@/auth"
// // 
 
// // export default auth((req) => {
// //   // if (!req.auth && req.nextUrl.pathname !== "/login") {
// //   //   const newUrl = new URL("/login", req.nextUrl.origin)
// //   //   return Response.redirect(newUrl)
// //   // }
// // })