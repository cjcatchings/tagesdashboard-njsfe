import * as React from 'react';
import MainContainer from './mainContainer';
import { asyncGetTasks } from '../../services/task/taskService';
import { asyncGetNotifications } from '../../services/notification/notificationService';

async function getTasks(){
    const taskResp = await asyncGetTasks();
    return taskResp;
}

async function getNotifications(){
    const notificationResp = await asyncGetNotifications();
    return notificationResp;
}

export default async function Page(){

    const tasks = await getTasks();
    const notifications = await getNotifications();

    return (
        <MainContainer 
            tasks={tasks} 
            notifications={notifications}/>
    )
}