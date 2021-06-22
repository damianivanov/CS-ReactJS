import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CardContent,
  CardActions,
  Card,
  Typography,
  Box,
} from "@material-ui/core";
import { getProject } from "../../services/projectService";
import { getJWT } from "../../services/userService";
import { Container } from "@material-ui/core";
const moment = require("moment");

export default function Project(props) {
  const [project, setProject] = useState([]);

  useEffect(() => {
    if (getJWT())
      getProject(props.props.match.params.projectId).then((project) => {
        console.log(project);
        setProject(project);
      });
  }, []);

  let date = moment(project.createdAt, "YYYY-MM-DD");

  return (
    <Box component="div" p={4}>
        <Typography variant="h2" align="center" color="error">
          {project.name}
        </Typography>

      <div></div>
    </Box>
  );
}
