'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import GridPaperItem from '../grid/gridPaperItem';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { amber } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

export default function Header({fullName}){
    const router = useRouter();
    const theme = useTheme();
    const Item = GridPaperItem({
        bgcolor: amber.A200,
        marginTop: '1em',
        marginBottom: '0.5em',
        marginLeft: '1em',
        marginRight: '1em'
    });

    const HeaderSubContainerGrid = styled(Grid)(() => ({
        height: '100%'
    }));
    const HeaderTextGridItem = styled(Grid)(() => ({
        alignSelf: 'flex-end',
        paddingBottom: '0.5em'
    }));
    const HeaderLogoutGridItem = styled(Grid)(() => ({
        alignSelf: 'flex-end'
    }))

    const userFullName = fullName || "Guy";

    //Consider useCallback and maybe move to header
    const handleLogout = async () => {
        // TODO:  Push logout to backend servce to delete cookie
        const logoutResp = await fetch(`/logout`, { method: 'POST' });
        router.push("/login?action=doLogout");
    }

    console.log("Rendering header");

    return(
        <Grid container data-testid="headerContainerGrid">
            <Grid item xs={12}>
                <Item elevation={2}>
                    <HeaderSubContainerGrid container>
                        <Grid item xs={1}></Grid>
                        <HeaderTextGridItem item
                            xs={10} 
                            sx={{
                                color: theme.status.appHeaderText
                            }}>
                            Hello {userFullName}!
                        </HeaderTextGridItem>
                        <HeaderLogoutGridItem item xs={1}>
                            <LogoutIcon onClick={handleLogout} />
                        </HeaderLogoutGridItem>
                    </HeaderSubContainerGrid>
                </Item>
            </Grid>
        </Grid>
    );
}