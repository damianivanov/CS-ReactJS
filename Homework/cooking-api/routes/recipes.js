const router = require("express").Router({ mergeParams: true });
const jwt = require("jsonwebtoken");
const { recipeValidation } = require("../validation");
const auth = require("../verifyToken");
const User = require("../Models/User");
const Recipe = require("../Models/Recipe");
const { checkAdmin, isSameUser } = require("../verifyRole");

router.get("/", auth, async (req, res) => {
  const { userId } = req.params;
  const recipes = await Recipe.find({ userId: userId });
  if (recipes.empty) {
    return res
      .status(204)
      .send("There are no recipes in the database by this user");
  }
  return res.status(200).send(recipes);
});
router.post("/", auth, async (req, res) => {
  const { userId } = req.params;
  const { error } = await recipeValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id: userId });

  const newRecipe = new Recipe({
    user: user.username,
    userId: userId,
    name: req.body.name,
    description: req.body.description,
    short_description: req.body.short_description,
    time: req.body.time,
    ingredients: req.body.ingredients,
    photo: req.body.photo,
    keywords: req.body.keywords,
  });
  try {
    const savedRecipe = await newRecipe.save();
    user.recipes.push(savedRecipe._id);
    user.save();
    res.status(201).redirect(`/api/users/${userId}/recipes/${savedRecipe._id}`);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.get("/:recipeId", auth, async (req, res) => {
  const { userId } = req.params;
  const { recipeId } = req.params;
  let recipe;
  if (isSameUser(req)) {
    recipe = await Recipe.findOne({ _id: recipeId, userId: userId });
  } else if (checkAdmin(req)) {
    recipe = await Recipe.findOne({ _id: recipeId });
  } else {
    return res.status(401).send("No Permissions");
  }
  if (recipe) {
    return res.status(200).send(recipe);
  } else return res.status(401).send("Invalid Recipe ID");
});

router.put("/:recipeId", auth, async (req, res) => {
  const { userId } = req.params;
  const { recipeId } = req.params;

  if (!userId || !recipeId) return res.status(400).send("Invalid Parameters");

  let recipe;
  if (isSameUser(req)) {
    recipe = await Recipe.findOneAndUpdate(
      { $and: [{ _id: recipeId }, { userId: userId }] },req.body,
      {new: true});
  } else if (checkAdmin(req)) {
    recipe = await Recipe.findOneAndUpdate({ _id: recipeId },req.body,
      {new: true,});
  } else {
    return res.status(401).send("No Permissions");
  }
  return res.status(200).redirect(`/api/users/${userId}/recipes/${recipeId}`);
});

router.delete("/:recipeId", auth, async (req, res) => {
  const { userId } = req.params;
  const { recipeId } = req.params;

  if (!userId || !recipeId) return res.status(400).send("Invalid Parameters");

  let recipe;
  if (isSameUser(req)) {
    recipe = await Recipe.deleteOne({
      $and: [{ _id: recipeId }, { userId: userId }],
    });
  } else if (checkAdmin(req)) {
    recipe = await Recipe.deleteOne({ _id: recipeId });
  } else {
    return res.status(401).send("No Permissions");
  }
  if (recipe.deletedCount) {
    const user = await User.findOne({ _id: userId });
    user.recipes.pull(recipeId);
    user.save();
    return res.status(200).send(`Recipe with ID: ${recipeId} was deleted`);
  } else return res.status(401).send("Invalid Recipe ID");
});

module.exports = router;
