import { asyncGetTasks, asyncAddNewTask } from '../../../services/task/taskService';
import { NextResponse } from 'next/server';

export async function GET(){
    const taskJson = await asyncGetTasks();
    return NextResponse.json(taskJson);
}

export async function PUT(request){
    const newTaskBody = await request.json();
    const putTaskJson = await asyncAddNewTask(newTaskBody);
    return NextResponse.json(putTaskJson);
}