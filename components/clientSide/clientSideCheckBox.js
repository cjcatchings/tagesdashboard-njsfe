'use client'

import { Check } from '@mui/icons-material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Container from '@mui/material/Container';

export default function ClientSideCheckBoxIcon({withContainer}){
    if(withContainer){
        return (
            <Container maxWidth="sm">
                <CheckBoxIcon />
            </Container>
        );
    }
    return (<CheckBoxIcon/>);
}