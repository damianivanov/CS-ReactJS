import http from "./http-client";
var jwt = require('jsonwebtoken');

// change all auth-tokens
// let headers= {
//   "auth-token":getJWT()
// }

export function getActiveUser() {
  return JSON.parse(localStorage.getItem("profile"));
}

function setActiveUser(token){
  var decoded = jwt.verify(token,process.env.REACT_APP_SECRET)
  localStorage.setItem("profile", JSON.stringify(decoded));
}
export function getRole(){
  var decoded = jwt.verify(getJWT(),process.env.REACT_APP_SECRET)
  return decoded.role
}

export function updateActiveUser(data){
  const current = getActiveUser()
  current.userId=data.id;
  current.email=data.email;
  current.role=data.role;
  current.username = data.username;
  localStorage.setItem("profile", JSON.stringify(current));
}

export function checkJWT() {
  return localStorage.getItem("userInfo") !== null;
}

export function getJWT() {
  return localStorage.getItem("userInfo");
}

function setJWT(token) {
  localStorage.setItem("userInfo", token);
}

export function getExpDate(){
  try {
    var decoded = jwt.verify(getJWT(),process.env.REACT_APP_SECRET)
    return decoded.exp
  } catch (error) {
    console.log(error)
    return 0
  }
}

// ---------API--------
export async function getFullAccount(){
  const user = getActiveUser()
  try {
    const signed = await http.get(`/users/${user.userId}`,{
      headers:{
        "auth-token":getJWT()
      }
    })
    return signed.data
  } catch (error) {
    console.log(error.response.data.message);
    return error
  }
}
export async function getAllUsers(){
  try {
    const users = await http.get(`/users`,{
      headers:{
        "auth-token":getJWT()
      }
    })
    return users.data
  } catch (error) {
    console.log(error.response.data.message);
    return error.response
  }
}


export async function login(user) {
  try {
    const signed = await http.post(`/login`, user)
    setJWT(signed.data.token);
    setActiveUser(signed.data.token);
    return signed
  } catch (error) {
    console.log(error.response);
    return error.response
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
      headers:{
        "auth-token":getJWT()
      }})
    return updated
  } catch (error) {
    return error.response
  }
}

export async function deleteUser(id){
  try {
    const deleted = await http.delete(`/users/${id}`,{
      headers:{ 
        "auth-token":getJWT()
      }})
    return deleted
  } catch (error) {
    return error.response
  }
}

export function logOut() {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("profile");
}




///KNOWN BUG:
//FIRST LOG IN - ACCOUNT WITH basic or manager permissions, refresh with f5
//SECOND LOG IN - ACCOUNT WITH admin (ONLY) permissions
//req.userId is from the basic acc
//RESOLVED --- but overall wrong use of headers objects, because its not updated if logout
