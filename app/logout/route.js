import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request){

    cookies().set('bppAt','',{maxAge: 0, sameSite: 'none', secure: true});
    const response = NextResponse.json({});
    response.cookies.delete('bppAt');
    return response;

}