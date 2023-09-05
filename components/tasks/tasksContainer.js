'use client'

import * as React from 'react';
import Paper from '@mui/material/Paper';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { brown } from '@mui/material/colors';

export default function TasksContainer({tasks, 
    setAddTaskDialogOpen, callTaskService, 'data-testid': dataTestId}){

    //TODO move to common fn
    const getDateNoTime = (dispDate) => {
        const DATE_NO_TIME_PATTERN = new RegExp('\\w{3}\\s\\d{1,2}\\s\\w{3}\\s\\d{4}','ig');
        const match = DATE_NO_TIME_PATTERN.exec(dispDate);
        return match ? dispDate.substring(0, DATE_NO_TIME_PATTERN.lastIndex) : dispDate;
    }

    //useCallback?
    const deleteTask = React.useCallback((taskId) => {
        fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        }).then((resp) => {
            callTaskService();
        });
    }, [callTaskService]);
    
    const generateTaskList = React.useCallback(() => {
        if(tasks.length == 0){
            return (<TableRow key={0}>
                        <TableCell component="td" colSpan={3}>
                            No tasks
                        </TableCell>
                    </TableRow>)
        }
        return tasks.map((task) =>(
            <TableRow key={task._id}>
                <TableCell component="td" scope="task" colSpan={2} size="small">
                    {task.title}
                </TableCell>
                <TableCell colSpan={2} size="small">
                    {getDateNoTime(task.disp_create_date)}
                </TableCell>
                <TableCell colSpan={1} size="small">
                    <IconButton 
                        size="small"
                        aria-label="delete" 
                        onClick={() => deleteTask(task._id)}
                        sx={{padding: 0}}>
                        <DeleteIcon sx={{color: brown.A400}} />
                    </IconButton>
                </TableCell>
            </TableRow>
        ));
    }, [tasks, deleteTask]);

    function handleOpenAddNewTask(event){
        console.log("Open task clicked!");
        setAddTaskDialogOpen(true);
    };

    return (
        <TableContainer component={Paper} data-testid={dataTestId}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{padding: '8px'}} colSpan={2} size="small">
                            Task Name
                            <AddBoxIcon 
                            sx={{marginLeft: '0.25em', verticalAlign: 'middle'}}
                            onClick={handleOpenAddNewTask}/>
                        </TableCell>
                        <TableCell sx={{padding: '8px'}} colSpan={2} size="small">Create Date</TableCell>
                        <TableCell colSpan={1} size="small"/>
                    </TableRow>
                </TableHead>
                <TableBody data-testid="tasksTableBody">
                    {
                        generateTaskList()
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}