import {  
    getPushNotifications
} from '../../../../services/notification/notificationService';
import { NextResponse } from 'next/server';

export async function GET(){
    const notificationJson = await getPushNotifications();
    return NextResponse.json(notificationJson);
}