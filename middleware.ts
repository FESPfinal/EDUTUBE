import { USER_TYPES } from '@/helper/constants/userConst';
import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

// 로그인이 필요한 페이지 목록
const protectedRoutes = [
  '/mypage',
  '/mypage/likes',
  '/mypage/cart',
  '/mypage/reserved',
  '/mypage/info',
  '/mypage/purchases',
  '/mypage/my-coffeechat',
  '/mypage/my-video',
  '/coffeechat/regist',
  '/coffeechat/update',
  '/video/regist',
  '/video/update',
];

// user가 접근할 수 없는 페이지 목록
const protectedCommonUserRoutes = [
  '/mypage/my-coffeechat',
  '/mypage/my-video',
  '/coffeechat/regist',
  '/coffeechat/update',
  '/video/regist',
  '/video/update',
];

// 로그인이 히면 접근할 수 없는 페이지 목록
const publicRoutes = ['/login', '/sign-up'];

export function middleware(request: NextRequest, res: NextResponse) {
  const cookie = request.cookies.get('refreshToken')?.valueOf();

  const refreshToken = cookie;
  // @ts-ignore
  const userType = request.cookies.get('userType')?.valueOf().value;

  const currentPath = request.nextUrl.pathname;
  if (!refreshToken && protectedRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (
    refreshToken &&
    userType === USER_TYPES.USER &&
    protectedCommonUserRoutes.includes(currentPath)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/not-found';
    return NextResponse.redirect(url);
  }

  if (refreshToken && publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  //api, _next/static, _next/image, favicon.ico, fonts, images를 포함하지 않는 모든 경로에 미들웨어가 적용
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)',
};
