import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getAllProjects,deleteProject, editProject } from "../../services/projectService";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ProjectCard from "../Helpers/ProjectCard";
import { store } from "react-notifications-component";
import {
  Typography,
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  NativeSelect,
  InputLabel,
} from "@material-ui/core";

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

export default function AllProjects({ props }) {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false); //Dialog
  const [modal, setModal] = useState({});
  const [openDelete,setOpenDelete] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [date,setDate] = useState(new Date())
  const classes = useStyles();
  
  useEffect(() => {
    const fetchUsers = async () => {
      if (props.signed)
        getAllProjects()
          .then((users) => {
            console.log(users);
            setProjects(users);
          })
          .catch((error) => console.log(error));
    };
    fetchUsers();
  }, [date,props.signed]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setModal({});
  };

  const handleDelete = () => {
    setOpenDelete(false);
    deleteProject(modal.id)
        .then((res) => {
          if (res.status === 200) {
            setDate(new Date())
            store.addNotification({
              title: "Success!",
              message: `Deleted ${modal.label}`,
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
        });;
    setModal({});
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModal({});
    setForm({});
  };

  const handleValidation = (project) => {
    let errors = {};
    let formIsValid = true;
    //label
    if (
      typeof project["name"] === "undefined" ||
      typeof project["company"] === "undefined" ||
      typeof project["managerId"] === "undefined" ||
      typeof project["deleted"] === "undefined" ||
      typeof project["description"] === "undefined" 
      ) {
      formIsValid = false;
      setError("All fields are required");
    } else setError("");
    
    if (project["name"].length<3) {
      formIsValid = false;
      errors["firstName"] = "Only letters";
    }

    if (project["managerId"].length<24) {
      formIsValid = false;
      errors["managerId"] = "Not valid Id";
    }

    setError(errors[0]); //?
    return formIsValid;
  };

  const handleSubmit = () => {
    if (handleValidation(form)) {
      editProject(form)
        .then((res) => {
          if (res.status === 200) {
            store.addNotification({
              title: "Success!",
              message: `Edited ${form.label}`,
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
            setDate(new Date())
            setOpen(false)
          } else {
            setError(res.data.message);
          }
        })
        .catch((err) => {
          setError(err.response.data);
        });
    }
  };

  
  const projectInfo = (project, key) => {
    return (
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <span>
          {project.name} / ({project.invitationCode}) / {project.company}
        </span>
        <IconButton edge="end" aria-label="complete">
          <EditIcon
            onClick={() => {
              setForm(project);
              handleClickOpen();
            }}
          />
        </IconButton>
        {!project.deleted && (
          <IconButton edge="end" aria-label="complete">
            <DeleteIcon
              onClick={() => {
                setModal(project);
                setOpenDelete(true);
              }}
            />
          </IconButton>
        )}
      </div>
    );
  };

  return (
    <div>
      {projects && projects.map((project, i) => projectInfo(project, i))}

      {/* edit dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit {form.label}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Name"
            value={form["name"]}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="company"
            name="company"
            label="Company"
            value={form["company"]}
            onChange={handleChange}
          />
          <InputLabel id="deleted">Deleted</InputLabel>
          <NativeSelect
            id="deleted"
            name="deleted"
            value={form["deleted"]}
            onChange={handleChange}
          >
            <option value={false}>Active</option>
            <option value={true}>Deleted</option>
          </NativeSelect>

          <TextField
            margin="dense"
            id="managerId"
            name="managerId"
            label="Manager Id"
            fullWidth
            value={form["managerId"]}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            multiline
            fullWidth
            rows={4}
            value={form["description"]}
            onChange={handleChange}
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

          <Button onClick={handleSubmit.bind(this)} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* delete Dialog */}
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do you want to delete ${modal.name}`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
