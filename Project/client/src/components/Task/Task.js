import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Avatar,
  CircularProgress
} from "@material-ui/core"; 
import { getTask } from "../../services/taskService";
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
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  avatar: {
    height: "40px",
    width: "40px",
    display: "inline-flex",
    verticalAlign: "center"
  }
}));

const moment = require("moment");

export default function Project(props) {
  
//   const member = (member) => {
//     return(
//       <div style={{
//       justify:"center",
//       alignItems: "center",
//       flexWrap: "wrap"}}>
//     <Typography
//       variant="h7"
//       style={{ padding: "5px" }}
//       >
//       {member.role.toUpperCase()} : {member.firstName}{" "}
//       {member.lastName} ({member.username})
//     </Typography>

//     <Avatar className={classes.avatar} src={member.photo} fontSize="large"/>
//   </div>
//   )
// }
  
  const classes = useStyles();
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject()
    {
      if (getJWT()){
        const task = await getTask(props.props.match.params.taskId)
        console.log(task);
        setTask(task);
        setLoading(false)
      }
    }
    fetchProject()
    },[]);


    if(!loading)
      return (
        <Container style={{ padding: "20px" }} border={2}>
          <Box >
            <Typography variant="h2" align="center" color="error">
              {task.task && task.task.label}
            </Typography>
            
            <Container style={{ width: "40%", float: "right",align:"left",padding:"20px" }}>
              <Typography align="right" variant="h6">
              <Box>
                Created on:{" "}
                {moment(task.task.createdAt, "YYYY-MM-DD")
                  .format("MMM Do YYYY")
                  .toString()}
                <Typography>Assigned by: {task.assignor.username}</Typography>
                <Typography>Assigned to: {task.assignee.username}</Typography>
                </Box>
              </Typography>

            </Container>
            <Container style={{ width: "50%", float: "left",align:"left",padding:"20px"}}>
              <Typography align="center" variant="h5">
                {task.task.description}
              </Typography>
              
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
    