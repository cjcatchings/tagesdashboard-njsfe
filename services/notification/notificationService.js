import { cookies } from 'next/headers';

const NOTIFICATIONS_URL = process.env.NOTIFICATIONS_API_URL;
const PUSH_NOTIFICATIONS_URL = process.env.PUSH_NOTIFICATIONS_API_URL;

export async function asyncGetNotifications(){

    const cookieList = cookies();
    const accessToken = cookieList.get("bppAt").value;
    if(!accessToken){
        throw Error("No valid access token");
    }

    const notificationResp = await fetch(`${NOTIFICATIONS_URL}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if(!notificationResp.ok){
        throw Error("Notification service call failed.")
    }

    const notificationJson = await notificationResp.json();

    return notificationJson;
}

export async function getPushNotifications(){
    const cookieList = cookies();
    const accessToken = cookieList.get("bppAt").value;
    if(!accessToken){
        throw Error("No valid access token");
    }

    const notificationResp = await fetch(`${PUSH_NOTIFICATIONS_URL}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if(!notificationResp.ok){
        throw Error("Push notification service call failed.")
    }

    const notificationJson = await notificationResp.json();

    return notificationJson;
}

export async function markNotificationsAsNotified(notifications){
    const cookieList = cookies();
    const accessToken = cookieList.get("bppAt").value;
    const toNotifyJson = JSON.stringify(notifications);
    const notificationResp = await fetch(`${NOTIFICATIONS_URL}/notified`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: toNotifyJson
    });

    if(!notificationResp.ok){
        throw Error("Mark notification service call failed.");
    }

    const notificationJson = await notificationResp.json();

    return notificationJson;
}