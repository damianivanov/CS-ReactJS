import http from "./http-client";

import { getJWT } from "./userService";

// const headers = {
//   "auth-token": getJWT(),
// };

export async function getMytasks() {
  const headers = {
    "auth-token": getJWT(),
  };
  try {
    const myTasks = await http.get(`/tasks/myActiveTasks`, {
      headers: headers,
    });
    return myTasks.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error;
  }
}

export async function getTask(id) {
  const headers = {
    "auth-token": getJWT(),
  };
  try {
    const task = await http.get(`/tasks/${id}`, {
      headers: headers,
    });
    return task.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error;
  }
}

export async function assignTask(task) {
  const headers = {
    "auth-token": getJWT(),
  };
  try {
    const result = await http.post(`/tasks/`, task, {
      headers: headers,
    });
    return result;
  } catch (error) {
    return error.response;
  }
}

export async function getTaskForProject(id) {
  const headers = {
    "auth-token": getJWT(),
  };
  try {
    const task = await http.get(`/projects/${id}/tasks`, {
      headers: headers,
    });
    return task.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error;
  }
}

export async function deleteTask(id) {
  const headers = {
    "auth-token": getJWT(),
  };
  try {
    const result = await http.delete(`/tasks/${id}`, {
      headers: headers,
    });
    return result;
  } catch (error) {
    return error.response;
  }
}

export async function editTask(task) {
  task.id = task._id;
  delete task._id;
  delete task.__v;
  const headers = {
    "auth-token": getJWT(),
  };
  try {
    const updated = await http.put(`/tasks/${task.id}`, task, {
      headers: headers,
    });
    return updated;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response;
  }
}

export async function completeTask(task) {
  const headers = {
    "auth-token": getJWT(),
  };
  try {
    const updated = await http.post(`/tasks/${task.id}/results`, task, {
      headers: headers,
    });
    return updated;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response;
  }
}
