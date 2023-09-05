'use client'

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

export default function ClientSideLoadingProgress({withContainer}){

    if(withContainer){
        return(
            <Container maxWidth="sm">
                <CircularProgress/>
            </Container>
        );
    }
    return (<CircularProgress />);

}