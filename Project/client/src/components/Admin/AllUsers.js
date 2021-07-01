import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getAllUsers,deleteUser, editUser } from "../../services/userService";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
  CircularProgress
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

export default function AllUsers({ props }) {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false); //Dialog
  const [modal, setModal] = useState({});
  const [openDelete,setOpenDelete] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [date,setDate] = useState(new Date())
  const [loading,setLoading] = useState(true)
  const classes = useStyles();
  
  useEffect(() => {
    const fetchUsers = async () => {
      if (props.signed)
        getAllUsers()
          .then((users) => {
            console.log(users);
            setUsers(users);
            setLoading(false)
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
    deleteUser(modal.id)
        .then((res) => {
          if (res.status === 200) {
            setDate(new Date())
            store.addNotification({
              title: "Success!",
              message: `Deleted ${modal.username}`,
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

  const handleValidation = (user) => {
    let errors = {};
    let formIsValid = true;
    //label
    if (
      typeof user["firstName"] === "undefined" ||
      typeof user["lastName"] === "undefined" ||
      typeof user["email"] === "undefined" ||
      typeof user["photo"] === "undefined" ||
      typeof user["role"] === "undefined" 
      ) {
      formIsValid = false;
      setError("All fields are required");
    } else setError("");
    
    if (!user["firstName"].match(/^[a-z ,.'-]+$/i)) {
      formIsValid = false;
      errors["firstName"] = "Only letters";
    }

    if (!user["lastName"].match(/^[a-z ,.'-]+$/i)) {
      formIsValid = false;
      errors["lastName"] = "Only letters";
    }

    if (!user["username"].match(/^[a-z0-9_-]{3,15}$/)) {
      formIsValid = false;
      errors["username"] =
        "The username should contain only letters,digits, - or _";
    }
    if (typeof user["password"] !== "undefined") {
      if (!user["password"].match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
        formIsValid = false;
        errors["password"] ="Minimum 8 characters, at least 1 letter, 1 number and 1 special character: ";
      }
    }

    //confirm password
    if (typeof user["confirm password"] !== "undefined") {
      if (user["confirm password"] !== user["password"]) {
        formIsValid = false;
        errors["confirm password"] = "Passwords doesn't match";
      }
    }

    setError(errors[0]); //?
    return formIsValid;
  };

  const handleSubmit = () => {
    if (handleValidation(form)) {
      editUser(form)
        .then((res) => {
          if (res.status === 200) {
            store.addNotification({
              title: "Success!",
              message: `Edited ${form.username}`,
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
  
  const member = (member, key) => {
    return (
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <Avatar className={classes.avatar} src={member.photo} sizes="small" />
        <span>
          {" "}
          {member.firstName} {member.lastName} ({member.username}){" "} ({member.role})
        </span>
        <IconButton edge="end" aria-label="complete">
          <EditIcon
            onClick={() => {
              setForm(member);
              handleClickOpen();
            }}
          />
        </IconButton>
        {!member.deleted && <IconButton edge="end" aria-label="complete">
          <DeleteIcon
            onClick={() => {
              setModal(member);
              setOpenDelete(true);
            }}
          />
        </IconButton>}
      </div>
    );
  };

  if(!loading){
  return (
    <div>
      {users && users.map((user, i) => member(user, i))}

      {/* edit dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit {form.username}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="firstName"
            name="firstName"
            label="FirstName"
            value={form["firstName"]}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            id="username"
            name="username"
            label="Username"
            value={form["username"]}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            id="lastName"
            name="lastName"
            label="LastName"
            value={form["lastName"]}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email"
            value={form["email"]}
            onChange={handleChange}
          />
          <TextField
            type="password"
            margin="dense"
            id="password"
            name="password"
            label="Password"
            value={form["password"]}
            onChange={handleChange}
          />
          <TextField
            type="password"
            margin="dense"
            id="confirm_password"
            name="confirm_password"
            label="Confirm Password"
            value={form["confrim_password"]}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="photo"
            name="photo"
            label="Photo"
            value={form["photo"]}
            onChange={handleChange}
          />
          <InputLabel id="role">Role</InputLabel>
          <NativeSelect id="role" name="role" value={form["role"]} onChange={handleChange}>
            <option value={"basic"}>Basic</option>
            <option value={"admin"}>Admin</option>
            <option value={"manager"}>Manager</option>
          </NativeSelect>

          <InputLabel id="deleted">Deleted</InputLabel>
          <NativeSelect id="deleted" name="deleted" value={form["deleted"]} onChange={handleChange}>
            <option value={false}>Active</option>
            <option value={true}>Deleted</option>
          </NativeSelect>

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
          {`Do you want to delete ${modal.username}`}
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

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" style={{ height: "100hv" }} />
    </div>
  );
}
