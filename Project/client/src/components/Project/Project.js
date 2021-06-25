import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Button,
  CardContent,
  CardActions,
  Card,
  Typography,
  Box,
  Grid,
  Avatar,
  CircularProgress
} from "@material-ui/core"; 
import { getProject } from "../../services/projectService";
import { getJWT } from "../../services/userService";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height:"100%"
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const moment = require("moment");

export default function Project(props) {
  const classes = useStyles();
  let history = useHistory();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProject()
    {
      if (getJWT()){
        const project = await getProject(props.props.match.params.projectId)
        console.log(project);
        setProject(project);
        setLoading(false)
      }
    }
    fetchProject()
    },[]);



    if(!loading)
      return (<Container style={{padding:"20px"}}>
        <Box border={1} >
          <Container>
            <Typography variant="h2" align="center" color="error">
              {project && project.project.name}
            </Typography>
            <Typography align="right" variant="h6" >
              Created on:{" "}
              {moment(project.project.createdAt, "YYYY-MM-DD")
                .format("MMM Do YYYY")
                .toString()}
            </Typography>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent:"flex-end"
              }}
            >

              
                <Typography align="right" variant="h6" style={{padding:"10px"}}>
                  Manager : {project.manager.firstName}{" "}
                  {project.manager.lastName}
                </Typography>
              
              <Avatar className={classes.large} src={project.manager.photo} />
            </div>
          </Container>
        </Box>
        </Container>
      );
  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" style={{height:"100hv"}}/>
    </div>
  );
}
    