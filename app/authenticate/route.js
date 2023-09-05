import { authenticateUser } from '../../components/auth/service/authService';

export async function POST(request){

    const requestJson = await request.json();

    const username = requestJson.username;
    const password = requestJson.password;

    const authResp = await authenticateUser(username, password);
    const respHeaders = {
        'Content-Type': 'application/json'
    }
    if(authResp.authenticated){
        respHeaders['Set-Cookie'] = `bppAt=${authResp.access_token};SameSite=None;Secure`;
    }

    return new Response(
        JSON.stringify(authResp), {
            status: 200,
            headers: respHeaders
        }
    );

}