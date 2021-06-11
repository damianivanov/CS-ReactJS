import { User } from "../entities/User";
import * as api from "./api";

var bcrypt = require("bcryptjs");

export async function insertUser(data) {
  var salt = bcrypt.genSaltSync(10);
  let hashedPassword = data.password;
  if (!hashedPassword.match(/^\$2[ayb]\$/)) {
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
  try {
    const token = getJWT()
    const {data}  = await api.updateUser(user,user._id,{ "auth-token": token });
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function registerUser(data) {
  try {
    delete data["confirm password"]
    const res = await api.registerUser(data);
    return res;
  } catch (error) {
    console.log(error.message);
    return {error:error.message}
  }
}
export async function getAllUsers() {
  try {
    const token = getJWT()
    const {data}  = await api.fetchUsers({ "auth-token": token });
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

function checkJWT() {
  return localStorage.getItem("userInfo") !== null;
}

function getJWT() {
  return localStorage.getItem("userInfo");
}

function setJWT(token) {
  if (!checkJWT()) localStorage.setItem("userInfo", token);
}

export async function login(user) {
  try {
    const signed = await api.loginUser(user);
    setJWT(signed.data);
  } catch (error) {
    console.log(error.message);
  }
}

export function logOut() {
  localStorage.removeItem("userInfo");
}

export function activeUser() {
  return localStorage.getItem("userInfo") !== null;
}

export function getActiveUser() {
  if (activeUser()) {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export async function deleteUser(id) {
  try {
    const token = getJWT()
    const res  = await api.deleteUser(id,{ "auth-token": token });
    return res;
  } catch (error) {
    console.log(error.message);
  }
}

export function editUser(data) {
  deleteUser(data.id);
  data.lastModified = Date.now();
  insertUser(data);
  if (getActiveUser().id === data.id) {
    localStorage.setItem("user", JSON.stringify(data));
  }
}

export async function getUser(id) {
  try {
    const token = getJWT()
    const res  = await api.getUser(id,{ "auth-token": token });
    return res;
  } catch (error) {
    console.log(error.message);
  }
}

//Refactor
