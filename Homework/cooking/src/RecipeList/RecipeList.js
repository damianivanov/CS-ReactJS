import React, { useState } from "react";
import { getAllRecipes } from "../services/recipesService";
import { CssBaseline  } from "@material-ui/core";
import List from "@material-ui/core/List";
import RecipeListItem from "../helperComponents/recipeListItem";

export default function RecipeList() {
  const [recipes,setRecipes] = useState(getAllRecipes());
  return (
    <div>
      <CssBaseline />
      <List>
        {recipes.map((recipe) => (
          <RecipeListItem
            recipe={recipe}
            setRecipes={setRecipes}
          ></RecipeListItem>
        ))}
      </List>
    </div>
  );
}
