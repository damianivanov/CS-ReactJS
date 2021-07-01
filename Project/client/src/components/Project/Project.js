import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Container,
  IconButton,
} from "@material-ui/core";
import { getProject } from "../../services/projectService";
import { assignTask } from "../../services/taskService";
import { store } from "react-notifications-component";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
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
    marginRight:"5px"
  },
}));

const moment = require("moment");

export default function Project(props) {
  const classes = useStyles();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); //Dialog
  const [modal, setModal] = useState({}); 
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProject() {
      if (props.signed) {
        const project = await getProject(props.props.match.params.projectId);
        setProject(project);
        setLoading(false);
      }
    }
    fetchProject();
  }, [open,props]);

   const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
    setModal({})
    setForm({})
  };

  const handleValidation = (task) =>{
    let errors = {};
    let formIsValid = true
    //label
  
    if (
      typeof task["label"] === "undefined" ||
      typeof task["description"] === "undefined" ||
      typeof task["startDate"] === "undefined" ||
      typeof task["dueDate"] === "undefined"
    )
    {
      formIsValid = false;
      setError("All fields are required");
    }
    else setError("")

      if (typeof task["label"] !== "undefined") {
        if (task["label"].length < 3 && task["description"].length > 256) {
          formIsValid = false;
          errors["label"] = "Atleast 3 symbols and max 256";
        }
      }

    //description
    if (typeof task["description"] !== "undefined") {
      if (task["description"].length<3 && task["description"].length>4096 ) {
        formIsValid = false;
        errors["description"] = "Atleast 3 symbols and max 4096";
      }
    }
    setError(errors && errors[0]); //?
    return formIsValid;
  }

  const handleSubmit = () =>{
    const task = {
      description: form.description,
      dueDate: form.dueDate,
      startDate: form.startDate,
      label: form.label,
      assignorId: project.project.managerId,
      projectId: project.project.id,
      assigneeId: modal.id
    }
    console.log(task)

    if (handleValidation(task)) {
      assignTask(task)
        .then((res) => {
          if (res.status === 201) {
            store.addNotification({
              title: "Success!",
              message: "Assigned task",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
            });
          } else {
            setError(res.data.message);
          }
        })
        .catch((err) => {
          setError(err.response.data);
        });
    }
  }

  const member = (member,key) => {
    return (
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <Avatar className={classes.avatar} src={member.photo} sizes="small" />
        <span> {member.firstName} {member.lastName} ({member.username}) </span>
        {(props.loggedUser.role === "admin" ||
          props.loggedUser.userId === project.project.managerId) && (
          <IconButton edge="end" aria-label="complete">
            <PlaylistAddIcon onClick={()=>{setModal(member);handleClickOpen()}} />
          </IconButton> 
        )} 
      </div>
    );
  };

 
  if (!loading) {
    if (!project.isAxiosError)
      return (
        <Container style={{ padding: "20px" }}>
          <Box>
            <Typography variant="h2" align="center" color="error">
              {project && project.project.name}
            </Typography>

            <Box border={1}>
              <Typography variant="h5" align="center">
                {project && project.project.description}
              </Typography>
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
                <Box border={1}>
                  <Typography style={{ float: "left", marginLeft: "5px" }}>
                    Created on:{" "}
                    {moment(project.project.createdAt, "YYYY-MM-DD")
                      .format("MMM Do YYYY")
                      .toString()}
                  </Typography>
                  <Typography style={{ marginRight: "5px" }}>
                    Company: {project.project.company}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <span>
                      Manger: {project.manager.firstName}{" "}
                      {project.manager.lastName} ({project.manager.username})
                    </span>
                    <Avatar
                      className={classes.avatar}
                      rc={project.manager.photo}
                      sizes="small"
                    />
                  </div>
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
              <Box border={1}>
                <Typography align="center" variant="h5">
                  Team:
                </Typography>
                {project.team.map((teamMember, key) => member(teamMember, key))}
              </Box>

              <Box border={1}>
                <Typography align="center" variant="h5">
                  Tasks:
                </Typography>
                {project.project.tasksId.map((subTask, key) => (
                  <h5>Task ID: {subTask}</h5>
                ))}
              </Box>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Assign Task</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Assign task to {modal.username}
                  </DialogContentText>

                  <TextField
                    margin="dense"
                    id="label"
                    name="label"
                    label="Label"
                    fullWidth
                    value={form["label"]}
                    onChange={handleChange}
                  />

                  <TextField
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={form["description"]}
                    onChange={handleChange}
                  />
                  <TextField
                    id="datetime-local"
                    label="Start date"
                    name="startDate"
                    type="datetime-local"
                    value={form["startDate"]}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="datetime-local"
                    label="Due date"
                    name="dueDate"
                    type="datetime-local"
                    value={form["dueDate"]}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ marginLeft: "10px" }}
                  />
                   {error && (
                    <Typography color="secondary" float="left">
                      {" "}
                      {error}{" "}
                    </Typography>
                  )}
                </DialogContent>
                <DialogActions>
                 
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>

                  <Button onClick={handleSubmit.bind(this)} color="primary">
                    Assign Task
                  </Button>
                </DialogActions>
              </Dialog>
            
            </Container>
          </Box>
        </Container>
      );
    return (
      <Typography color="secondary" variant="h2" align="center">
        No Access
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" style={{ height: "100hv" }} />
    </div>
  );
}
