'use client'

import {styled, Paper} from '@mui/material';

export default function GridPaperItem(props){
    const {height, bgcolor, marginTop, marginBottom, ...other} = props || {};
    return styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : bgcolor,
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: height || '100px',
        borderRadius: '1em',
        boxShadow: '4px 4px black',
        marginTop: marginTop || 0,
        marginBottom: marginBottom || 0,
        marginLeft: props.marginLeft || 0,
        marginRight: props.marginRight || 0
    }));
}