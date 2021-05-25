import { User } from "../entities/User";
var bcrypt = require("bcryptjs");

export async function insertUser(data) {
  let users = getAllUser();
  var salt = bcrypt.genSaltSync(10);
  let hashedPassword =data.password
  if(!hashedPassword.match(/^\$2[ayb]\$/)){
    hashedPassword = bcrypt.hashSync(data.password, salt);
  }
  const user = new User(
    data.id,
    data.fullname,
    data.username,
    hashedPassword,
    data.gender,
    data.role,
    data.photo,
    data.bio,
    data.status,
    data.shareDate,
    data.lastModified
  );
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

export function getAllUser() {
  if (localStorage.getItem("users") === null)
    localStorage.setItem("users", JSON.stringify([]));
  return JSON.parse(localStorage.getItem("users"));
}

export function checkUser(data) {
  let users = getAllUser();
  let currentUser=null;
  users.forEach((user) => {
    if (
      user.username === data.username &&
      bcrypt.compareSync(data.password, user.password)
    ) {
        currentUser=user

    }
  });
  return currentUser;
}

export function login(user) {
  if (localStorage.getItem("user") == null)
    localStorage.setItem("user", JSON.stringify(user));
}

export function logOut() {
    if (localStorage.getItem("user") != null)
    localStorage.removeItem("user");
}

export function activeUser(){
    return (localStorage.getItem("user") !== null) 
}

export function getActiveUser(){
  if(activeUser()){
    return JSON.parse(localStorage.getItem("user"))
  }
}

export function deleteUser(id){
let users = getAllUser()
users = users.filter((user) => user.id !== id);
localStorage.setItem("users", JSON.stringify(users));
}

export function editUser(data){
deleteUser(data.id)
data.lastModified=Date.now()
insertUser(data)
if(getActiveUser().id===data.id){
  localStorage.setItem('user', JSON.stringify(data))
}
}

export function getUser(id){
  const users = getAllUser()
  const user = users.find(user => user.id===id)
  return user
}
//crossorigin,userId,Refactor