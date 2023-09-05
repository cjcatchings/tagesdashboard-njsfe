'use client'

import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';

export default function AddTaskDialog(props){

    const { open, handleClose, setCreateTaskSuccess } = props;

    const [taskDueDate, setTaskDueDate] = React.useState(null);
    const [savingNewTask, setSavingNewTask] = React.useState(false);
    const [savingTaskText, setSavingTaskText] = React.useState(null);

    const AddTaskDialogTitle = styled(DialogTitle)(() => ({
        paddingLeft: '10px',
        paddingBottom: '5px'
    }));

    const AddNewTaskDialogBox = styled(Box)(() => ({
        paddingLeft: '10px'
    }));

    const handleSubmitNewTask = (event) => {
        event.preventDefault();
        setSavingTaskText("Saving task...");
        setSavingNewTask(true);
        const taskTitle = event.target.taskTitle.value;
        const due_date_values = {
            dd_year: taskDueDate.$y,
            dd_month: taskDueDate.$M,
            dd_day: taskDueDate.$D
        };
        fetch('/api/tasks', {
            method: 'PUT',
            body: JSON.stringify([{
                title: taskTitle,
                due_date: due_date_values
            }])
        }).then(data => data.json())
        .then(jsonData => {
            if(jsonData.status && jsonData.status == "Unauthenticated"){
                console.log("Could not authorize the request.  Must log in again.");
                router.push("/auth");
            }else{
                setSavingNewTask(false);
                setSavingTaskText(null);
                setCreateTaskSuccess(true);
            }
        }).catch(err => {
            console.error("Saving task failed!", err);
            setSavingNewTask(false);
            setSavingTaskText("Unable to save task.");
        });
    };

    return (
        /* Maybe move to root layout? */
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog open={open} onClose={handleClose}>
                <AddTaskDialogTitle>Add New Task</AddTaskDialogTitle>
                <AddNewTaskDialogBox component="form" onSubmit={handleSubmitNewTask}>
                <TextField 
                        required
                        margin="normal"
                        id="taskTitle"
                        name="taskTitle"
                        size="small"
                        onFocus={() => setSavingTaskText(null)}
                        disabled={savingNewTask}
                        label="Title" />
                    <DatePicker 
                        required
                        id="taskDueDate"
                        name="taskDueDate"
                        size="small"
                        slotProps={{ textField: {size: "small" }}}
                        onFocus={() => setSavingTaskText(null)}
                        value={taskDueDate}
                        disabled={savingNewTask}
                        onChange={(newValue) => setTaskDueDate(newValue)}
                        label="Due Date" />
                    <div>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={savingNewTask}
                        sx={{ mt: 3, mb: 2 }}>
                    Add Task
                    </Button>
                    {(savingTaskText) ? (<span>{savingTaskText}</span>) : <></>}
                    </div>
                </AddNewTaskDialogBox>
            </Dialog>
        </LocalizationProvider>
    );

}