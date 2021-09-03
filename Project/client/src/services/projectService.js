import http from "./http-client";
import { getJWT, getActiveUser } from "./userService";

// const headers = {
//   "auth-token": getJWT(),
// };

export async function getProject(id) {
  const headers = {
  "auth-token": getJWT(),
};
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
  const headers = {
    "auth-token": getJWT()
  }
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
  const headers = {
    "auth-token": getJWT(),
  };
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
  const headers = {
    "auth-token": getJWT(),
  };
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
  const headers = {
    "auth-token": getJWT(),
  };
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

export async function getAllProjects() {
  const headers = {
    "auth-token": getJWT(),
  };
  try {
    const project = await http.get(`/projects`, {
      headers: headers,
    });
    return project.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response;
  }
}
export async function editProject(project) {
  const headers = {
    "auth-token": getJWT(),
  };
  try {
    const updated = await http.put(`/projects/${project.id}`,project, {
      headers: headers,
    });
    return updated;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response;
  }
}
export async function deleteProject(id) {
  const headers = {
    "auth-token": getJWT(),
  };
  try {
    const deleted = await http.delete(`/projects/${id}`, {
      headers: headers,
    });
    return deleted;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response;
  }
}

