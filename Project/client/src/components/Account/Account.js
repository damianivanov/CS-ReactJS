import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EditUser from './EditUser'
import MyTasks from './MyTasks'
import Admin from '../Admin/Admin'
import MyProjects from './MyProjects'
import { getRole } from '../../services/userService'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}



export default function NavTabs(props) {
  
  const [value, setValue] = React.useState(0);
  
  if(!props.signed) return <Redirect to="/dashboard" />

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div >
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Edit Profile" href="/edit" {...a11yProps(0)} />
          <LinkTab label="My Tasks" href="/tasks" {...a11yProps(1)} />
          <LinkTab label="My Projects" href="/projects" {...a11yProps(2)} />
          {getRole() === "admin" &&<LinkTab label="Admin Panel" href="/admin" {...a11yProps(3)} />}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <EditUser props={props}></EditUser>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyTasks props={props}></MyTasks>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MyProjects signed={props.signed}
              loggedUser={props.loggedUser}
              setLoggedUser={props.setLoggedUser}></MyProjects>
      </TabPanel>
    <TabPanel value={value} index={3}>
        <Admin signed={props.signed}
              loggedUser={props.loggedUser}
              setLoggedUser={props.setLoggedUser}></Admin>
      </TabPanel>
    </div>
  );
}
