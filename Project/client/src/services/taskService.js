import http from "./http-client";

import {getJWT} from './userService'

const headers= {
  "auth-token":getJWT()
}
export async function getMytasks() {
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