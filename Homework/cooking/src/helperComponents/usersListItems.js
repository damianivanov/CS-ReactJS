import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  makeStyles,
  Typography,
  Box,
  Avatar,
  Button,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import { deleteUser } from "../services/userService";
import { CssBaseline } from "@material-ui/core";

export default function UserListItem(props) {
  let user = props.user;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Cancel = (id) => {
    setOpen(false);
  };
  const useStyles = makeStyles((theme) => ({
    Link: {
      color: theme.palette.type === "dark" ? "white" : "black",
      textDecoration: "none",
      margin: "20px",
    },
    avatar: {
      height: "150px",
      width: "150px",
      backgroundSize: "containt",
    },
  }));
  const classes = useStyles();
  return (
    <ListItem>
        <CssBaseline/>
      <Avatar
        aria-label="recipe"
        className={classes.avatar}
        src={user.photo}
      />

      <Box component="span" m={1}>
        <Typography variant="h5">
          {user.fullname}(<b>{user.username}</b>) Last Modified{" "}
          <b>{new Date(user.lastModified).toLocaleDateString()}</b>
        </Typography>
      </Box>

      <Link to={`/users/edit/${user.id}`} className={classes.Link}>
        <EditIcon></EditIcon>
      </Link>
      <Button onClick={handleClickOpen}>
        {" "}
        <DeleteIcon> </DeleteIcon>{" "}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Do you want to delete this?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting {user.username}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Cancel} color="primary" autoFocus>
            Cancel
          </Button>

          <Button
            onClick={() => {
              deleteUser(user.id);
              setOpen(false);
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
}
