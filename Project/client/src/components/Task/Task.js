import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
} from "@material-ui/core";
import { getTask } from "../../services/taskService";
import { getJWT } from "../../services/userService";
import { Container } from "@material-ui/core";

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
  },
}));

const moment = require("moment");

export default function Project(props) {
  const classes = useStyles();
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (getJWT()) {
        const task = await getTask(props.props.match.params.taskId);
        console.log(task);
        setTask(task);
        setLoading(false);
      }
    }
    fetchProject();
  }, [props.props.match.params.taskId]);

  if (!loading)
    return (
      <Container style={{ padding: "20px" }} border={2}>
        <Box>
          <Typography variant="h2" align="center" color="error">
            {task.task && task.task.label}
          </Typography>
          <Box border={1}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography align="start" variant="h5">
                Start Date:{" "}
                {moment(task.task.startDate, "YYYY-MM-DD")
                  .format("dddd, MMMM Do YYYY, h:mm:ss a")
                  .toString()}
              </Typography>
              <br />
              <Typography align="end" variant="h5">
                Due Date:
                {moment(task.task.dueDate, "YYYY-MM-DD")
                  .format("dddd, MMMM Do YYYY, h:mm:ss a")
                  .toString()}
              </Typography>
            </div>
          </Box>

          <Container
            style={{
              width: "40%",
              float: "right",
              align: "left",
              padding: "20px",
            }}
          >
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
          <Container
            style={{
              width: "50%",
              float: "left",
              align: "left",
              padding: "20px",
            }}
          >
            <Typography align="center" variant="h5">
              {task.task.description}
            </Typography>

            <List align="center" variant="h5">
              Sub Tasks:
              {task.subTasks &&
                task.subTasks.map((subTask) => (
                  <ListItem>
                    <span>
                      <h5>Name: {subTask.label}</h5>
                      <h5>Due Date: {subTask.dueDate}</h5>
                      <h5> Status: {subTask.status}</h5>
                    </span>
                  </ListItem>
                ))}
            </List>
          </Container>
        </Box>
      </Container>
    );

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" style={{ height: "100hv" }} />
    </div>
  );
}
