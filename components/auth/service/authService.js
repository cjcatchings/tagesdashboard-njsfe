
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;

export async function authenticateUser(username, password){

    const reqBody = JSON.stringify({
        username: username,
        password: password
    });

    const authResp = await fetch(`${AUTH_URL}/authn`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Request-Headers': process.env.NEXT_PUBLIC_ACCESS_CONTROL_HEADERS
        },
        body: reqBody
    })

    if(!authResp.ok){
        console.error(error);
        throw new Error("Failed to authenticate user.");
    }
    return authResp.json();

};

export async function validateUserToken(token, withPayload, withFirstName){

    const tokenToValidate = token;
    const withPayloadStr = withPayload ? "True": "False";
    const withFirstNameStr = withFirstName ? "True": "False";

    if(tokenToValidate == null){
        return {
            authenticated: false,
            name: null
        };
    }

    return fetch(`${AUTH_URL}/validate_token?withPayload=${withPayloadStr}&withName=${withFirstNameStr}`, {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + tokenToValidate
        }
    })
    .then(resp => {return resp.json()})
    .then(data => {
        const tokenValid = data.authenticated;
        const resp = {};
        resp['authenticated'] = tokenValid;
        if(!tokenValid){
            resp['reason'] = data.reason;
        }else{
            resp['name'] = data.name;
        }
        return resp;
    })
    .catch(err => {
        console.error("Verification of access token failed.", err);
        return {
            authenticated: false,
            name: null
        };
    });

}