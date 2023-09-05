import { asyncDeleteTask } from '../../../../services/task/taskService';
import { NextResponse } from 'next/server';

export async function DELETE(request, {params}){

    console.log(params);
    const taskId = params.taskid;
    const deleteTaskJson = await asyncDeleteTask(taskId);
    return NextResponse.json(deleteTaskJson);

}