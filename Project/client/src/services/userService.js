import http from "./http-client";
var jwt = require('jsonwebtoken');
const headers= {
  "auth-token":getJWT()
}
// export async function insertUser(data) {
//   let users = getAllUser();
//   var salt = bcrypt.genSaltSync(10);
//   let hashedPassword = data.password;
//   if (!hashedPassword.match(/^\$2[ayb]\$/)) {
//     hashedPassword = bcrypt.hashSync(data.password, salt);
//   }
//   const user = new User(
//     data.id,
//     data.fullname,
//     data.username,
//     hashedPassword,
//     data.gender,
//     data.role,
//     data.photo,
//     data.bio,
//     data.status,
//     data.shareDate,
//     data.lastModified
//   );
//   users.push(user);
//   localStorage.setItem("users", JSON.stringify(users));
// }

// export function getAllUser() {
//   if (localStorage.getItem("users") === null)
//     localStorage.setItem("users", JSON.stringify([]));
//   return JSON.parse(localStorage.getItem("users"));
// }

// export function checkUser(data) {
//   let users = getAllUser();
//   let currentUser = null;
//   users.forEach((user) => {
//     if (
//       user.username === data.username &&
//       bcrypt.compareSync(data.password, user.password)
//     ) {
//       currentUser = user;
//     }
//   });
//   return currentUser;
// }

// export function login(user) {
//   if (localStorage.getItem("user") == null)
//     localStorage.setItem("user", JSON.stringify(user));
// }
// export function deleteUser(id) {
//   let users = getAllUser();
//   users = users.filter((user) => user.id !== id);
//   localStorage.setItem("users", JSON.stringify(users));
// }

// export function editUser(data) {
//   deleteUser(data.id);
//   data.lastModified = Date.now();
//   insertUser(data);
//   if (getActiveUser().id === data.id) {
//     localStorage.setItem("user", JSON.stringify(data));
//   }
// }

//---------------------------------------

export function getActiveUser() {
  return JSON.parse(localStorage.getItem("profile"));
}

function setActiveUser(){
  var decoded = jwt.verify(getJWT(),process.env.REACT_APP_SECRET)
  localStorage.setItem("profile", JSON.stringify(decoded));
}

export function checkJWT() {
  return localStorage.getItem("userInfo") !== null;
}

export function getJWT() {
  return localStorage.getItem("userInfo");
}

function setJWT(token) {
  if (!checkJWT()) localStorage.setItem("userInfo", token);
}

export function getExpDate(){
  var decoded = jwt.verify(getJWT(),process.env.REACT_APP_SECRET)
  return decoded.exp
}

export async function getFullAccount(){
  const id = getActiveUser().userId
  try {
    const signed = await http.get(`/users/${id}`,{
      headers:headers
    })
    return signed.data
  } catch (error) {
    console.log(error.response.data.message);
    return error
  }
}

export async function login(user) {
  try {
    const signed = await http.post(`/login`, user)
    setJWT(signed.data.token);
    setActiveUser();
  } catch (error) {
    console.log(error.response.data.message);
    //return error
  }
}

export async function registerUser(user){
  try {

    delete(user["confirm password"])
    const registered = await http.post(`/register`, user)
    return registered
  } catch (error) {
    return error.response
  }
}

export async function editUser(user){
  try {
    const updated = await http.put(`/users/${user.id}`, user,{
      headers:headers})
    return updated
  } catch (error) {
    return error.response
  }
}
export function logOut() {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("profile");
}




//Refactor
