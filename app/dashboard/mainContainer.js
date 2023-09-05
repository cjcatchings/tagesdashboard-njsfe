'use client'

import * as React from 'react';
import SimpleLandingMenu from '../../components/menu/landingMenu';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GridPaperItem from '../../components/grid/gridPaperItem';
import LandingTabPanelSet from '../../components/tabs/landingTabs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddTaskDialog from '../../components/tasks/addTaskDialog';

export default function MainContainer(props){
    
    const [tasks, setTasks] = React.useState(props.tasks);
    const [notifications, setNotifications] = React.useState(props.notifications);
    const [listenToPushNotifications, setlistenToPushNotifications] = React.useState(true);
    const [tabValue, setTabValue] = React.useState(0);
    const [visibleTabs, setVisibleTabs] = React.useState([
        {tabName: "Tasks", tabValue: 0, key: 0},
        {tabName: "Notifications", tabValue: 1, key: 1}, 
        {tabName: "Projects", tabValue: 2, key: 2}
    ]);
    const [addTaskDialogOpen, setAddTaskDialogOpen] = React.useState(false);
    const [createTaskSuccess, setCreateTaskSuccess] = React.useState(false);

    const Item = GridPaperItem({height: '600px'});

    const openTabFromMenu = React.useCallback((event) => {
        const {tabIndex, tabName} = event.currentTarget.dataset;

        const tabIndexAsInt = parseInt(tabIndex);
        setTabValue(tabIndexAsInt);
        if(visibleTabs.filter(t => t.tabValue == tabIndexAsInt).length == 0){
            setVisibleTabs([
                {tabName: tabName, tabValue: tabIndexAsInt, key: tabIndexAsInt},
                ...(visibleTabs.filter((item, index) => index < visibleTabs.length - 1))
            ]);
        };
    },[visibleTabs]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
        
    const callTaskService = React.useCallback(async () => {
        const updatedTasksResp =  await fetch('http://localhost:3000/api/tasks');
        if(!updatedTasksResp.ok){
            throw new Error("Task service retrieval failed");
        }
        const updatedTasksJson =  await updatedTasksResp.json();
        if(updatedTasksJson.status==="ERROR" || updatedTasksJson.status=="Unauthenticated"){
            const errMsg = updatedTasksJson.error ? updatedTasksJson.error.message : updatedTasksJson.status;
            console.log(errMsg);
            return;
        }
        setTasks(updatedTasksJson);
    }, [setTasks]);

    const notificationAbortController = new AbortController();
    const notificationAbortSignal = notificationAbortController.signal;
    const getPushNotifications = async () => {
        const newNotificationsResp = await fetch('http://localhost:3000/api/notifications/pushed', { 
            method: 'GET',
            notificationAbortSignal 
        });
        if(!newNotificationsResp.ok){
            throw new Error("Task service retrieval failed");
        }
        const newNotificationsJson = await newNotificationsResp.json();
        if(newNotificationsJson.status==="ERROR" || newNotificationsJson.status=="Unauthenticated"){
            const errMsg = newNotificationsJson.error ? newNotificationsJson.error.message : newNotificationsJson.status;
            console.log(errMsg);
            return;
        }
        const numOfNewNotifications = newNotificationsJson.length;
        console.log(`Number of new notifications: ${numOfNewNotifications}`);
        if(numOfNewNotifications > 0){
            setNotifications(prevNotifications => [...prevNotifications, ...newNotificationsJson]);
            fetch('api/notifications/notified', {
                method: 'POST',
                body: JSON.stringify(newNotificationsJson.map((notification) => notification._id))
            })
            .then((resp) => resp.json())
            .then((json) => {
                console.log(`Number of notifications noticed: ${json.modifiedCount}`)
            }).catch((error) => {
                console.log(`Notification of noticed notifications failed. ${error}`);
            })
        }
    }

    const handleAddTaskDialogClose = React.useCallback(() => {
        setAddTaskDialogOpen(false);
        if(createTaskSuccess){
            setCreateTaskSuccess(false);
            callTaskService();
        }
    },[createTaskSuccess, callTaskService]);

    React.useEffect(() => {
        const startListeningToPushNotifications = async () => {
            while(listenToPushNotifications){
                await getPushNotifications();
            }
        }
        startListeningToPushNotifications();
        return () => {
            setlistenToPushNotifications(false);
            notificationAbortController.abort();
        };
    })

    return (
        <>
                <Grid container maxWidth="lx" spacing={2} sx={{height: '100vh'}}>
                    <Grid item xs={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box sx={{height: 600, display: 'flex', flexDirection: 'column'}}>
                                    <MemorizedLeftHandMenu
                                        openTabFromMenu={openTabFromMenu} />  
                                    <MemorizedLeftHandLowerBox/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Item height="600px">
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                            {
                                visibleTabs.map((tab)=> 
                                    <Tab
                                        label={tab.tabName} 
                                        value={tab.tabValue}
                                        key={tab.key}/>
                                )
                            }
                            </Tabs>
                            <LandingTabPanelSet
                                tabValue={tabValue}
                                tasks={tasks}
                                notifications={notifications}
                                callTaskService={callTaskService}
                                setAddTaskDialogOpen={setAddTaskDialogOpen} />
                        </Item>
                    </Grid>
                    <MemorizedRightHandBox />
                </Grid>
                <AddTaskDialog 
                    open={addTaskDialogOpen} 
                    handleClose={handleAddTaskDialogClose} 
                    setCreateTaskSuccess={setCreateTaskSuccess}/>
        </>
            
    );
}

function LeftHandMenu(props){
    console.log("Rendering LeftHandMenu");

    const {openTabFromMenu, ...other} = props;
    const subMenuHeight = '180px';
    const SubMenuItem = GridPaperItem({
        height: subMenuHeight,
        marginLeft: '1em'
    });

    return (
        <Box mb={1} 
            xs={{height: subMenuHeight}}>
            <SubMenuItem elevation={2}>
                <SimpleLandingMenu openTabFromMenu={openTabFromMenu}>
                </SimpleLandingMenu>
            </SubMenuItem>
        </Box>
    );
}

const MemorizedLeftHandMenu = React.memo(LeftHandMenu);

function LeftHandLowerBox(props){
    console.log("Rendering LeftHandLowerBox");

    const SubMenuBoxItem = GridPaperItem({
        height: '100%',
        marginLeft: '1em'
    });

    return (
        <Box sx={{flexGrow: 1}}>
            <SubMenuBoxItem elevation={2}>Box A</SubMenuBoxItem>
        </Box>
    );
}

const MemorizedLeftHandLowerBox = React.memo(LeftHandLowerBox);

function RightHandBox(props){

    const Item = GridPaperItem({
        height: '600px',
        marginRight: '1em'
    });
    console.log("Rendering RightHandBox");

    return (
        <Grid item xs={3}>
            <Item>Box C</Item>
        </Grid>
    );
}

const MemorizedRightHandBox = React.memo(RightHandBox);