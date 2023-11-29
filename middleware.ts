// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(req: NextRequest, res: NextResponse) {
//   const response = NextResponse.next();
//   response.cookies.set('isAuthed2', 'true');

//   const allCookies = req.cookies;
//   const cookie = req.cookies.get('accessToken')?.valueOf();
//   console.log('cookie>>>>', allCookies);

//   if (req.nextUrl.pathname === '/blocked') {
//     return new NextResponse(null, {
//       status: 403,
//     });
//   }
// }

// export const config = {
//   matcher: '/',
// };
