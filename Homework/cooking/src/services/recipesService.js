import { Recipe } from "../entities/Recipe";

export function insertRecipe(data) {  
const user = JSON.parse(localStorage.getItem("user"));
  let recipes = getAllRecipes();
  const recipe = new Recipe(
    user.id,
    user.username,
    data.name,
    data.short_description,
    data.time,
    data.ingredients,
    data.description,
    data.keywords,
    data.photo
  );
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

export function getAllRecipes() {
  if (localStorage.getItem("recipes") == null)
    localStorage.setItem("recipes", JSON.stringify([]));
  return JSON.parse(localStorage.getItem("recipes"));
}

export function checkRecipe(data) {
  let recipes = getAllRecipes();
  let currentrecipe=null;
  recipes.forEach((recipe) => {
    if (
      recipe.recipename === data.recipename
    ) {
        currentrecipe=recipe

    }
  });
  return currentrecipe;
}
