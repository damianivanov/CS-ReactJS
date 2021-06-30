import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  CircularProgress,
  AppBar,
  Tab,
  Tabs,
} from "@material-ui/core";
import { getRole } from "../../services/userService";
import { Redirect } from "react-router-dom";
import AllUsers from './AllUsers'
import AllProjects from './AllProjects'
import AllTasks from './AllTasks'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  large: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  avatar: {
    height: "40px",
    width: "40px",
    display: "inline-flex",
    verticalAlign: "center",
    marginRight: "5px",
  },
}));

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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function fetchProject() {
      if (props.signed) {
        setLoading(false);
      }
    }
    fetchProject();
  }, [props.signed]);

  if (getRole() !== "admin") return <Redirect to="/" />;

  if (!loading) {
    return (
      <div style={{marginTop:"0px"}}>
        <AppBar position="static" style={{maxWidth:"50%",margin:"0 auto"}}>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="All Users" href="/allUsers" {...a11yProps(0)} />
            <LinkTab
              label="All Projects"
              href="/allProjects"
              {...a11yProps(1)}
            />
            <LinkTab label="All Tasks" href="/allTasks" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <AllUsers props={props}></AllUsers>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AllTasks props={props}></AllTasks>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AllProjects
            props={props}
          ></AllProjects>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Admin
            signed={props.signed}
          ></Admin>
        </TabPanel>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" style={{ height: "100hv" }} />
    </div>
  );
}
