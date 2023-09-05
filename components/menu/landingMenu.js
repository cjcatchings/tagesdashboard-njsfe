'use client'

import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state';
import CircleIcon from '@mui/icons-material/Circle';
import MenuOpen from '@mui/icons-material/MenuOpen';
import lmStyles from './landingMenu.module.css';

export default function SimpleLandingMenu({openTabFromMenu}){

    return (
        <MenuList>
            <MenuItem
                data-tab-index={0}
                data-tab-name="Tasks"
                onClick={openTabFromMenu}>
                    <CircleIcon viewBox="12 -12 24 48" />
                    <span>Tasks</span>
            </MenuItem>
            <MenuItem
                data-tab-index={1}
                data-tab-name="Notifications"
                onClick={openTabFromMenu}><CircleIcon viewBox="12 -12 24 48"/>Notifications</MenuItem>
            <MenuItem
                data-tab-index={2}
                data-tab-name="Projects"
                onClick={openTabFromMenu}><CircleIcon viewBox="12 -12 24 48"/>Projects</MenuItem>
            <PopupState className={lmStyles.dayToDayPopupMenu} variant="popover" popupId="day-to-day-popup-menu">
                {(popupState) => 
                    (<React.Fragment>
                        <MenuItem {...bindTrigger(popupState)} data-testid="day2DayMenuItem">
                                <CircleIcon viewBox="12 -12 24 48"/><span className={lmStyles.dayToDayText}>Day to Day</span><MenuOpen />
                        </MenuItem>
                        <Menu 
                            elevation={2} 
                            className={lmStyles.dayToDayPopup} 
                            data-testid="day2DaySubMenu"
                            {...bindMenu(popupState)}>
                            <MenuItem
                                data-tab-index={3}
                                data-tab-name="Meals"
                                onClick={(e) =>{popupState.close(); openTabFromMenu(e)}}>Meals</MenuItem>
                            <MenuItem
                                data-tab-index={4}
                                data-tab-name="Todos"
                                onClick={(e) =>{popupState.close(); openTabFromMenu(e)}}>Todos</MenuItem>
                            <MenuItem
                                data-tab-index={5}
                                data-tab-name="Fitness"
                                onClick={(e) =>{popupState.close(); openTabFromMenu(e)}}>Fitness</MenuItem>
                            <MenuItem
                                data-tab-index={6}
                                data-tab-name="German"
                                onClick={(e) =>{popupState.close(); openTabFromMenu(e)}}>German</MenuItem>
                            <MenuItem
                                data-tab-index={7}
                                data-tab-name="Tech Learning"
                                onClick={(e) =>{popupState.close(); openTabFromMenu(e)}}>Tech Learning</MenuItem>
                            <MenuItem
                                data-tab-index={8}
                                data-tab-name="Guitar"
                                onClick={(e) =>{popupState.close(); openTabFromMenu(e)}}>Guitar</MenuItem>
                        </Menu>
                </React.Fragment>)}
            </PopupState>
        </MenuList>
    );
};