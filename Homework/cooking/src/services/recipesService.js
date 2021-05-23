import { Recipe } from "../entities/Recipe";

export function insertRecipe(data) {
  const user = JSON.parse(localStorage.getItem("user"));
  let recipes = getAllRecipes();
  const recipe = new Recipe(
    data.id,
    user.id,
    user.username,
    data.name,
    data.short_description,
    data.time,
    data.ingredients,
    data.photo,
    data.description,
    data.keywords,
    data.shareDate,
    data.lastModified
  );
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

export function getAllRecipes() {
  if (localStorage.getItem("recipes") == null)
    localStorage.setItem("recipes", JSON.stringify([]));
  return JSON.parse(localStorage.getItem("recipes"));
}

// export function checkRecipe(data) {
//   let recipes = getAllRecipes();
//   let currentrecipe = null;
//   recipes.forEach((recipe) => {
//     if (recipe.recipename === data.recipename) {
//       currentrecipe = recipe;
//     }
//   });
//   return currentrecipe;
// }

function sortByDateDesc(recipes) {
  recipes.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  return recipes;
}

export function filterRecipes(user, keywords) {
  let recipes = getAllRecipes();
  if (user !== "") {
    recipes = recipes.filter((recipe) => recipe.user === user);
  }
  if (keywords.length > 0) {
    recipes = recipes.filter((recipe) =>
      keywords.every((keyword) => recipe.keywords.includes(keyword))
    );
  }
  return sortByDateDesc(recipes);
}

export function deleteRecipe(id) {
  let recipes = getAllRecipes();
  recipes = recipes.filter((recipe) => recipe.id !== id);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

export function editRecipe(data){
  deleteRecipe(data.id);
  data.lastModified=Date.now();
  insertRecipe(data);
}

export function getRecipe(id){
  const recipes = getAllRecipes()
  const recipe =  recipes.find(recipe => recipe.id === id)
  console.log("Service",recipe)
  return recipe
}