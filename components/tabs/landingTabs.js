import * as React from 'react';
import Typography from '@mui/material/Typography';
import TasksContainer from '../tasks/tasksContainer';
import NotificationsContainer from '../notifications/notificationsContainer';

function LandingTabPanelSet(props){
  const {tabValue, tasks, notifications, setAddTaskDialogOpen, callTaskService, ...other} = props;

  return (<>
            <LandingTabPanel value={tabValue} index={0}>
                <TasksContainer
                  tasks={tasks}
                  callTaskService={callTaskService}
                  setAddTaskDialogOpen={setAddTaskDialogOpen}
                  data-testid="tasksContainerTestId"
                />
            </LandingTabPanel>
            <LandingTabPanel value={tabValue} index={1}>
              <NotificationsContainer 
                notifications={notifications}/>
            </LandingTabPanel>
            <LandingTabPanel value={tabValue} index={2}>Projects</LandingTabPanel>
            <LandingTabPanel value={tabValue} index={3}>Meals</LandingTabPanel>
            <LandingTabPanel value={tabValue} index={4}>Todos</LandingTabPanel>
            <LandingTabPanel value={tabValue} index={5}>Fitness</LandingTabPanel>
            <LandingTabPanel value={tabValue} index={6}>German</LandingTabPanel>
            <LandingTabPanel value={tabValue} index={7}>Tech Learning</LandingTabPanel>
            <LandingTabPanel value={tabValue} index={8}>Guitar</LandingTabPanel>
            </>);
}

export default React.memo(LandingTabPanelSet);

export function LandingTabPanel(props){
    const {children, value, index, ...other} = props;

    return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
              <Typography component={'span'}>{children}</Typography>
          )}
        </div>
      );
};

export function LandingTabCard(props){
  return(<div></div>);
};