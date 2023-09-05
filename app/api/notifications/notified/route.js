import {  
    markNotificationsAsNotified 
} from '../../../../services/notification/notificationService';
import { NextResponse } from 'next/server';

export async function POST(request){
    const noticedTasks = await request.json();
    const notificationJson = await markNotificationsAsNotified(noticedTasks);
    return NextResponse.json(notificationJson);
}