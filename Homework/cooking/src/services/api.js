import axios from "axios";

export async function fetchUsers(headers) {
  const data = await axios.get(`http://localhost:3001/api/users/`, {
    headers: headers,
  });
  return data;
}

export async function loginUser (user) {
  const data = await axios.post(`http://localhost:3001/api/login`, user);
  return data;
}

export async function updateUser (user,headers) {
  const res = await axios.put(`http://localhost:3001/api/user/${user._id}`, user,{
    headers: headers,
  });
  return res;
}

export async function registerUser (user) {
  const res = await axios.post(`http://localhost:3001/api/users/`, user);
  return res;
}

export async function deleteUser (id,headers) {
  const res = await axios.delete(`http://localhost:3001/api/users/${id}`, {
    headers: headers,
  });
  return res;
}

export async function getUser(id,headers) {
  const data = await axios.get(`http://localhost:3001/api/users/${id}/`, {
    headers: headers,
  });
  return data;
}
export const createRecipe = (newPost, id) =>
  axios.post(`http://localhost:3001/api/${id}`, newPost);
export const updateRecipe = (id, updatedPost) =>
  axios.patch(`http://localhost:3001/api/${id}`, updatedPost);
export const deleteRecipe = (id) =>
  axios.delete(`http://localhost:3001/api/${id}`);
