import http from "./http-client";
import { getJWT, getActiveUser } from "./userService";

const headers = {
  "auth-token": getJWT(),
};

export async function getProject(id) {
  try {
    const project = await http.get(`/projects/${id}`, {
      headers: headers,
    });
    return project.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error;
  }
}
export async function getMyProjects() {
  const id = getActiveUser().userId;
  try {
    const myProjects = await http.get(`/projects/myprojects/${id}`, {
      headers: headers,
    });
    return myProjects.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error;
  }
}

export async function createProject(project, userId) {
  project = { ...project, managerId: userId };
  try {
    const createdProject = await http.post(`/projects`, project, {
      headers: headers,
    });
    return createdProject;
  } catch (error) {
    return error.response;
  }
}

export async function joinProject(code) {
  try {
    const project = await http.post(
      `/projects/join/${code}`,
      {},
      {
        headers: headers,
      }
    );
    return project;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response;
  }
}

export async function leaveProject(id) {
  try {
    const project = await http.post(
      `/projects/leave/${id}`,
      {},
      {
        headers: headers,
      }
    );
    return project;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response;
  }
}
