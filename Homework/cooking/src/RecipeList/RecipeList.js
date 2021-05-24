import React from "react";
import { getAllRecipes } from "../services/recipesService";
import {
  CssBaseline,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import RecipeListItem from "../helperComponents/recipeListItem";

export default function RecipeList() {
  let recipes = getAllRecipes();
  return (
    <div>
      <CssBaseline />
      <List>
        {recipes.map((recipe) => (
          <RecipeListItem recipe={recipe}></RecipeListItem>
          // <ListItem>
          //   <Avatar
          //     aria-label="recipe"
          //     className={classes.avatar}
          //     src={recipe.photo}
          //   />

          //   <Box component="span" m={1}>
          //     <Typography variant="h5">
          //       {recipe.name} by <b>{recipe.user}</b> Last Modified{" "}
          //       <b>{new Date(recipe.lastModified).toLocaleDateString()}</b>
          //     </Typography>
          //   </Box>

          //   <Link to={`/recipes/edit/${recipe.id}`} className={classes.Link}>
          //     <EditIcon></EditIcon>
          //   </Link>
          //   <Button onClick={handleClickOpen}>
          //     {" "}
          //     <DeleteIcon> </DeleteIcon>{" "}
          //   </Button>

          //   <Dialog
          //     open={open}
          //     onClose={handleClose}
          //     aria-labelledby="alert-dialog-title"
          //     aria-describedby="alert-dialog-description"
          //   >
          //     <DialogTitle id="alert-dialog-title">{`Do you want to delete this?`}</DialogTitle>
          //     <DialogContent>
          //       <DialogContentText id="alert-dialog-description">
          //         Deleting {recipe.name}
          //       </DialogContentText>
          //     </DialogContent>
          //     <DialogActions>
          //       <Button onClick={Cancel} color="primary" autoFocus>
          //         Cancel
          //       </Button>

          //       <Button
          //         onClick={() => {
          //         deleteRecipe(recipe.id)
          //           setOpen(false);
          //         }}
          //         color="primary"
          //       >
          //         Confirm
          //       </Button>
          //     </DialogActions>
          //   </Dialog>
          // </ListItem>
        ))}
      </List>
    </div>
  );
}
