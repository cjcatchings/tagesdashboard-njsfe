import { NextResponse } from 'next/server';
import { validateUserToken } from './components/auth/service/authService';

//TODO need to fix redirect to dashboard if logged in (currently routes to main page)
export async function middleware(request){
    console.log(`middleware hit: ` + request.nextUrl.pathname);
    const doLogout = request.nextUrl.searchParams.get("action") === "doLogout";
    const currentAccessToken = doLogout ? null : request.cookies.get("bppAt");
    //If an access token is in cookies, try to validate
    if(currentAccessToken && !doLogout){
        const tokenValidationResult = await validateUserToken(currentAccessToken.value, false, false);
        if(tokenValidationResult.authenticated){
            console.log(tokenValidationResult);
            if(request.nextUrl.pathname==="/login"){
                /* User is still authenticated, redirect to dashboard page */
                //return NextResponse.redirect(new URL(`/${parseJwt(currentAccessToken).landing_page}`, request.url));
                const resp = NextResponse.redirect(new URL('/dashboard', request.url));
                resp.headers.set("X-Full-Name", tokenValidationResult.name);
                return resp;
            }
            const resp = NextResponse.next();
            if(!request.nextUrl.pathname.startsWith("/api")){
                resp.headers.set("X-Full-Name", tokenValidationResult.name);
            }
            return resp;
        }else{
            //Maybe move to service?
            const logoutResp = await fetch(
                `${process.env.HOST_URL}/logout`, {
                    method: 'POST'
                }
            );
            const redirectResposne = NextResponse.redirect(new URL('/login?action=doLogout', request.url));
            redirectResposne.headers.set("Set-Cookie", `bppAt=;Max-Age=0;SameSite=None;Secure`);
            return redirectResposne;
        }
    //If no access token exists, check if we are trying to obtain one.  If not, go to login page.
    }else if(request.nextUrl.pathname!=="/authenticate"
        && request.nextUrl.pathname!=="/login"){
        return NextResponse.redirect(new URL('/login', request.url));
    };
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|logout).*)'
    ]
}