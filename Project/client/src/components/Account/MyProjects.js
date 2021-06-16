import React, { useEffect,useState } from "react";
import { getMyProjects } from "../../services/projectService";
import { getJWT } from "../../services/userService";
import ProjectCard from "../Helpers/ProjectCard";

export default function MyProjects({ props }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (getJWT())
      getMyProjects().then((projects) => {
        console.log(projects);
        setProjects(projects);
      });
  }, []);


  return (
      <div>
    {projects.map((project,i) => <ProjectCard project={project}></ProjectCard>)}
      </div>
  );
}
