const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { uservalidation, userValidation } = require("../validation");
const sendErrorResponse = require("../utils").sendErrorResponse;
const verifyToken = require("../verifyToken");
const verifyRoleOrSelf = require("../verifyRole.js");
const User = require("../Models/User");
const replaceId = require("../utils").replaceId;
const ROLES = require("../Models/Roles");

router.get("/", verifyToken, verifyRoleOrSelf(3, false), async (req, res) => {
  const allUsers = await User.find();
  if (!allUsers) return sendErrorResponse(req, res, 204, `No users`);
  return res.status(200).send(allUsers);
});
router.post("/", verifyToken, verifyRoleOrSelf(3, false), async (req, res) => {
  const { error } = await userValidation(req.body);
  if (error) return sendErrorResponse(req, res, 400, error.details[0].message, error);

  const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }],});
  if (user) return sendErrorResponse(req, res, 400, `User already exists`);

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    username: req.body.username,
    password: req.body.password,
    projects: req.body.projects,
    tasks: req.body.tasks,
    role: req.body.role ? req.body.role : "basic",
    photo: req.body.photo ? req.body.photo : (req.body.gender ? "male-avatar.png" : "woman-avatar.png")
  });

  try {
    const savedUser = await newUser.save();
    delete savedUser.password;
        replaceId(savedUser); 
        const uri = req.baseUrl + '/users/' + savedUser.id;
        console.log('Created User: ', savedUser.id);
        return res.location(uri).status(201).json(savedUser);
  } catch (error) {
    sendErrorResponse(req, res, 500, `Server error: ${error}`, error);
  }
});

//{userId}
router.get( "/:userId",verifyToken, verifyRoleOrSelf(3, true), async (req, res) => {
    const { userId } = req.params;
    if (!userId) return sendErrorResponse(req, res, 400, `Missing userId`);

    const user = await User.findOne({ _id: userId });
    if (!user)
      sendErrorResponse(req, res, 204, `There is no user with this id`);
    delete user.password;
    replaceId(user);
    return res.status(200).send(user);
  }
);
router.put("/:userId", verifyToken,verifyRoleOrSelf(3,true), async (req, res) => {
  const { userId } = req.params;
  if (!userId) return sendErrorResponse(req, res, 400, `Missing userId`);

  const user = req.body;
  const { error } = await userValidation(user);
  if (error) return sendErrorResponse(req, res, 400, error.details[0].message, error);

  if (user.id !== userId) {
    sendErrorResponse(req, res, 400, `Invalid user data - id in url doesn't match: ${user}`);
    return;
}
if(req.user.role !== 3 && user.role !== req.user.role) {
  sendErrorResponse(req, res, 400, `Invalid user data - role can not be changed.`);
  return;
}
delete (user.id);
try {
  const updated = await User.findOneAndUpdate({_id:userId},user,{
    new: true
  });
  var newUser=updated.toObject()
  replaceId(newUser)
  delete(newUser.__v)
  return res.json(newUser);

} catch (error) {
  sendErrorResponse(req, res, 400, `Error while saving the user.`);  
}
});
router.delete( "/:userId", verifyToken, verifyRoleOrSelf(3, false), async (req, res) => {
    const { userId } = req.params;
    if (!userId) return sendErrorResponse(req, res, 400, `Missing userId`);

    const user = await User.findOne({ _id: userId });
    if (!user) return sendErrorResponse(req, res, 400, `User doesn't exist.`);

    if (user.deleted) return sendErrorResponse(req, res, 400, `User is deleted.`);
    user.deleted = true;
    await user.save();
    return res.status(200).send({message:`User ${user.username} was deleted`});
  }
);

module.exports = router;
