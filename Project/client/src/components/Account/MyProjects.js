import React, { useEffect,useState } from "react";
import { makeStyles,GridList,Button } from "@material-ui/core";
import { getMyProjects } from "../../services/projectService";
import { getJWT } from "../../services/userService";
import ProjectCard from "../Helpers/ProjectCard";
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    margin: "20px",
  },
  gridList: {
    flexWrap: "wrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));
export default function MyProjects(props) {
  const classes = useStyles();
  const [date,setDate]=useState(new Date())
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects= async ()=>{
      if (getJWT())
      getMyProjects().then((projects) => {
        console.log(projects);
        setProjects(projects);
      });
    }
    fetchProjects()
    }, [date]);

 if(!props.signed) return <Redirect to="/login" /> 
  
  return (
    <div className={classes.root}>

      {(props.loggedUser.role === "admin" ||
        props.loggedUser.role === "manager") && (
       <div> <Button href={"/create"} variant="contained" color="secondary" style={{margin:"10px"}}>
          Create
        </Button>
        </div>
      )}

      <GridList className={classes.gridList} cols={2.5}>
        {projects.map((project, i) => (
          <ProjectCard project={project} setDate={setDate}></ProjectCard>
        ))}
      </GridList>
    </div>
  );
}
