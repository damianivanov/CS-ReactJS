import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Avatar, CircularProgress,Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText,TextField,Button } from "@material-ui/core";
import { getProject } from "../../services/projectService";
import { getJWT } from "../../services/userService";
import { Container,IconButton } from "@material-ui/core";
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
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({});
  const [form, setForm] = useState({});

  useEffect(() => {
    async function fetchProject() {
      if (getJWT()) {
        const project = await getProject(props.props.match.params.projectId);
        setProject(project);
        setLoading(false);
      }
    }
    fetchProject();
  }, [props.props.match.params.projectId,open]);

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
  };

  const handleSubmit = () =>{
    console.log(form)
    console.log(modal)
    const task = {
      description: form.description,
      dueDate: form.dueDate,
      label: form.label,
      assignorId: project.project.managerId,
      projectId: project.project.id,
      assigneeId: modal.id
    }
    console.log(task)
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

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Assign Task</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Assign Task To {modal.username}
                  </DialogContentText>

                  <TextField
                    autoFocus
                    margin="dense"
                    id="label"
                    name="label"
                    label="Label"
                    fullWidth
                    required
                    value={form["label"]}
                    onChange={handleChange}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    required
                    value={form["description"]}
                    onChange={handleChange}
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
                  />

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
