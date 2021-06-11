const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { registerValidation, userValidation } = require("../validation");
const auth = require("../verifyToken");
const verifyRole = require("../verifyRole");
const User = require("../Models/User");
const ROLES = require("../Models/Roles");
const recipes = require("./recipes");
const { canEdit } = require("../verifyRole");

router.get("/", auth, verifyRole.isAdmin, async (req, res) => {
  const allUsers = await User.find();
  if (!allUsers)
    return res
      .status(204)
      .send({ error: "There are no users in the database" });
  return res.status(200).json(allUsers);
});

router.post("/", async (req, res) => {
  const { error } = await registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already exists");

  const newUser = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    role: req.body.role ? req.body.role : "user",
    photo: req.body.gender ? "male-avatar.png" : "woman-avatar.png",
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).location(`/api/users/${savedUser._id}`).send(savedUser._id);
  } catch (error) {
    res.status(401).send(error);
  }
});

//{userId}
router.get("/:userId", auth, canEdit, async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).send("Invalid UserId");

  const user = await User.findOne({ _id: userId });
  if (!user) return res.status(204).send("The user doesn't exists");

  return res.status(200).send(user);
});
router.put("/:userId", auth, canEdit, async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).send("Invalid UserID");

  const user = await User.findOne({ _id: userId });
  if (!user) return res.status(204).send("The user doesn't exists");

  const isSameUser = verifyRole.isSameUser(req);
  if (isSameUser) {
    delete req.body.role;
    delete req.body.password;
  }
  const { error } = await userValidation(req.body);
  if (!error) {
    const savedUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    res.status(200).redirect(`/api/users/${savedUser._id}`);
  } else {
    return res.status(400).send(error.details[0].message);
  }
});
router.delete("/:userId", auth,canEdit, async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).send("Invalid UserId");

  const user = await User.findOne({ _id: userId });
  if (!user) return res.status(404).send("The user doesn't exists");
  
  await User.deleteOne({ _id: user._id });
  return res.status(200).send(`User ${user.username} was deleted`);
  
});

router.use("/:userId/recipes", recipes);
module.exports = router;
