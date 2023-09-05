'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';

export default function LoginBox(){

    const router = useRouter();
    const [loginUserName, setLoginUserName] = React.useState(null);
    const [loginPassword, setLoginPassword] = React.useState(null);
    const [loginState, setLoginState] = React.useState("Begin Login");

    const handleUsernameChange = (event) => {
        setLoginUserName(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setLoginPassword(event.target.value);
    }

    const isLoginButtonAvailable = () => {
        return loginUserName && loginPassword;
    }

    //TODO:  move to service JS
    const handleLoginAttempt = (event) => {
        event.preventDefault();
        setLoginState("Logging in...");
        fetch("/authenticate", {
            method: 'POST',
            body: JSON.stringify({
                username: loginUserName,
                password: loginPassword
            })
        }).then((resp) => resp.json())
        .then((authJson) => {
            if(authJson.authenticated){
                setLoginState("Login Success");
                //router.push(`/${authJson.redirect_to}`);
                router.push('/dashboard');
            }else{
                setLoginState("Login failed - User");
            }
        }).catch((error) => {
            console.error(error);
            setLoginState("Login failed - Server");
        });
    };

    return (
            <Container maxWidth="sm" disableGutters sx={{height: '100vh'}}>
                <Box
                    sx={{bgcolor: '#3b79db', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    marginTop: '10px',
                    borderRadius:2,
                    boxShadow: '2px 2px black'}}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLoginAttempt} sx={{mt:1, ml:2, mr:2}}>
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            onChange={handleUsernameChange}
                            autoFocus
                        />
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            onChange={handlePasswordChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={!isLoginButtonAvailable()}
                            sx={{ mt: 3, mb: 2 }}>
                        <Typography>Sign In</Typography>
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>{loginState}</Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
    );

};