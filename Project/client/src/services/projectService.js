import http from "./http-client";
import {getJWT,getActiveUser} from './userService'
var jwt = require('jsonwebtoken');

const headers= {
  "auth-token":getJWT()
}

export async function getMyProjects(){
    const id = getActiveUser().userId
    try {
      const myProjects = await http.get(`/projects/myprojects/${id}`,{
        headers:headers
      })
      return myProjects.data
    } catch (error) {
      console.log(error.response.data.message);
      return error
    }
  }
  