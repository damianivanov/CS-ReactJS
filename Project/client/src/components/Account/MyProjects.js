import React, { useEffect,useState } from "react";
import { getMyProjects } from "../../services/projectService";
import { getJWT } from "../../services/userService";
import ProjectCard from "../Helpers/ProjectCard";
import { Redirect } from 'react-router-dom';

export default function MyProjects(props) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (getJWT())
      getMyProjects().then((projects) => {
        console.log(projects);
        setProjects(projects);
      });
  }, []);

 if(!props.signed) return <Redirect to="/login" /> 
  
  return (
    <div style={{padding:"20px"}}>
      {projects.map((project, i) => (
        <ProjectCard project={project}></ProjectCard>
      ))}
    </div>
  );
}
