import React from "react";
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  AppBar,
  Tab,
  Tabs,
} from "@material-ui/core";
import { getRole } from "../../services/userService";
import { Redirect } from "react-router-dom";
import AllUsers from './AllUsers'
import AllProjects from './AllProjects'


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
    "aria-controls": `nav-tabpanel-${index}`,
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

export default function Admin(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (getRole() !== "admin") return <Redirect to="/" />;

    return (
      <div>
        <AppBar position="static" style={{maxWidth:"50%",margin:"0 auto"}}>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="All Users" href="/allUsers" {...a11yProps(0)} />
            <LinkTab label="All Projects"href="/allProjects" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} style={{maxWidth:"50%"}}>
          <AllUsers props={props}></AllUsers>
        </TabPanel>
        <TabPanel value={value} index={1} style={{maxWidth:"50%"}}>
          <AllProjects
            props={props}
          ></AllProjects>
        </TabPanel>
      </div>
    );
}
