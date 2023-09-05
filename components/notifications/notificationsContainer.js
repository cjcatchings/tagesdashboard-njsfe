'use client'

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';

export default function NotificationsContainer({notifications, 'data-testid': dataTestId}){

    //TODO move to common fn
    const getDateNoTime = (dispDate) => {
        const DATE_NO_TIME_PATTERN = new RegExp('\\w{3}\\s\\d{1,2}\\s\\w{3}\\s\\d{4}','ig');
        const match = DATE_NO_TIME_PATTERN.exec(dispDate);
        return match ? dispDate.substring(0, DATE_NO_TIME_PATTERN.lastIndex) : dispDate;
    }

    return(
    <TableContainer component={Paper} data-testid={dataTestId}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{padding: '8px'}} colSpan={2} size="small">Notification</TableCell>
                    <TableCell sx={{padding: '8px'}} colSpan={2} size="small">Create Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody data-testid="notificationsTableBody">
                {
                    notifications.map((notification) => (
                        <TableRow key={notification._id}>
                            <TableCell component="td" scope="task" colSpan={2} size="small">
                                {notification.description}
                            </TableCell>
                            <TableCell colSpan={2} size="small">
                                {getDateNoTime(notification.disp_create_date)}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>
    );

}