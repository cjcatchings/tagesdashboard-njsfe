import { 
    asyncGetNotifications, 
} from '../../../services/notification/notificationService';

import { NextResponse } from 'next/server';

export async function GET(){
    const notificationJson = await asyncGetNotifications();
    return NextResponse.json(notificationJson);
}