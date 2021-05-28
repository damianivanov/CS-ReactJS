import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  makeStyles,
  Typography,
  Box,
  Avatar,
  Button,
  ListItem,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import { Link,useHistory } from "react-router-dom";
import { deleteRecipe, getAllRecipes } from "../../services/recipesService";

export default function RecipeListItem(props) {
  let recipe = props.recipe;
  let history = useHistory();
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
      height: "100px",
      width: "100px",
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
              props.setRecipes(getAllRecipes);
              history.push("/recipes");
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
