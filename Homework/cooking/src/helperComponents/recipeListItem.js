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
import { deleteRecipe } from "../services/recipesService";

export default function RecipeListItem(props) {
  let recipe = props.recipe;
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
      <Avatar
        aria-label="recipe"
        className={classes.avatar}
        src={recipe.photo}
      />

      <Box component="span" m={1}>
        <Typography variant="h5">
          {recipe.name} by <b>{recipe.user}</b> Last Modified{" "}
          <b>{new Date(recipe.lastModified).toLocaleDateString()}</b>
        </Typography>
      </Box>

      <Link to={`/recipes/edit/${recipe.id}`} className={classes.Link}>
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
            Deleting {recipe.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Cancel} color="primary" autoFocus>
            Cancel
          </Button>

          <Button
            onClick={() => {
              deleteRecipe(recipe.id);
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
