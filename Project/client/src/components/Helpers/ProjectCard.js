import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { leaveProject } from "../../services/projectService";
import {
  Card,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Alert from '@material-ui/lab/Alert';
const moment = require('moment');
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
    margin: "15px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 0,
//     paddingTop: "56.25%",
//   },
//   expand: {
//     transform: "rotate(0deg)",
//     marginLeft: "auto",
//     transition: theme.transitions.create("transform", {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: "rotate(180deg)",
//   },

// }));
export default function ProjectCard({project,setDate}) {
  const classes = useStyles();
  let date = moment(project.createdAt, 'YYYY-MM-DD')
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Cancel = (id) => {
    setOpen(false);
  };

  const handleLeave = async () => {
    const res = await leaveProject(project.id);
    if (res.status !== 200) 
    setError(res.data.message)
    setOpen(false);
    setDate(new Date())
  }; 
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        ></Typography>
        <Typography variant="h4" component="h1" align="center">
          {project.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" align="right">
          {project.company}
        </Typography>
        <Typography variant="subtitle2" component="p" gutterBottom>
          {project.description.substr(0, 100)}
          <br />
          <Typography
            variant="caption"
            component="p"
            gutterBottom
            align="right"
          >
            {date.format("MMM Do YYYY")}
          </Typography>
        </Typography>
      </CardContent>

      <CardActions>
        <Button href={`/project/${project.id}`}>See Project</Button>
        <Button onClick={handleClickOpen} style={{float:"right"}}>
          Leave <ExitToAppIcon />
        </Button>
      </CardActions>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Do you want to leave this project?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Leaving {project.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Cancel} color="primary" autoFocus>
            Cancel
          </Button>

          <Button
            onClick={handleLeave}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {error && <Alert severity="error">{error}</Alert>}
    </Card>
  );
}
