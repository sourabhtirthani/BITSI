
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const isAuthenticated = !!req.auth;
	const { nextUrl } = req;
  // console.log('isauthenticate'  , isAuthenticated)
  if(req.nextUrl.pathname.startsWith('/api/admin') && !isAuthenticated){
    // console.log('in here in teh middleware api')
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if(req.nextUrl.pathname.startsWith('/admin') && !isAuthenticated){
    // console.log('in erher')
    if(req.nextUrl.pathname != '/admin'){
      // console.log('two inside')
    return Response.redirect(new URL('/admin', nextUrl));
    }
  }
  else if(req.nextUrl.pathname === ('/admin') && isAuthenticated){
    // console.log('in here authenticated')
    return Response.redirect(new URL('/admin/analytic-dashboard', nextUrl));
  }
 
});

//  update the config eveytime a new route is added to admin section
// export const config = {
//   matcher: ['/admin/compensation' , '/admin/"path*' , '/api/admin/:path*' , '/admin/analytic-dashboard' , '/admin/wallet-management' , '/admin/prices'
//     , '/admin/minting' , '/admin/nft-minting', '/admin/coin-minting', '/admin/coin-insurance', '/admin/nft-insurance', '/admin/views-and-analysis' , '/admin/coin-parameters',
//     '/admin/ownership' , '/admin/views-and-analysis-wallets' , '/admin/views-and-analysis-events'
//   ], 
// };

export const config = {
  matcher : ['/admin/:path*' , '/api/admin/:path*'],
}