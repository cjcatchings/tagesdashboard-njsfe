import { cookies } from 'next/headers';

const TASK_URL = process.env.TASK_API_URL;

export async function asyncGetTasks(taskId){

    const cookieList = cookies();
    const accessToken = cookieList.get("bppAt").value;
    const encodedTaskQuery = taskId ? `?taskId=${taskId}` : '';
    if(!accessToken){
        throw Error("No valid access token");
    }

    const taskResp = await fetch(`${TASK_URL}${encodedTaskQuery}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const tasksJson = await taskResp.json();

    if(!taskResp.ok){
        throw Error("Task service call failed.")
    }

    return tasksJson;
}

export async function asyncAddNewTask(newTaskContent){
    const cookieList = cookies();
    const accessToken = cookieList.get("bppAt").value;

    const addTaskResp = await fetch(`${TASK_URL}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(newTaskContent)
    });

    if(!addTaskResp.ok){
        throw Error("Add task service call failed.");
    }

    const addTaskJson = await addTaskResp.json();

    return addTaskJson;
}

export async function asyncDeleteTask(taskId){
    const cookieList = cookies();
    const accessToken = cookieList.get("bppAt").value;

    if(!taskId){
        console.log("No taskId provided");
        return
    }

    const deleteTaskResp = await fetch(`${TASK_URL}/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if(!deleteTaskResp.ok){
        throw Error("Delete task service call failed.")
    }

    const deleteTaskJson = await deleteTaskResp.json();
    return deleteTaskJson;

}