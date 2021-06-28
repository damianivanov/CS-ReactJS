import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Avatar, CircularProgress } from "@material-ui/core";
import { getProject } from "../../services/projectService";
import { getJWT } from "../../services/userService";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  large: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  avatar: {
    height: "40px",
    width: "40px",
    display: "inline-flex",
    verticalAlign: "center",
  },
}));

const moment = require("moment");

export default function Project(props) {
  const member = (member) => {
    return (
      <div
        style={{
          justify: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h7" style={{ padding: "5px" }}>
          {member.firstName} {member.lastName} ({member.username})
        </Typography>

        <Avatar
          className={classes.avatar}
          src={member.photo}
          fontSize="large"
        />
      </div>
    );
  };

  const classes = useStyles();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (getJWT()) {
        const project = await getProject(props.props.match.params.projectId);
        console.log(project);
        setProject(project);
        setLoading(false);
      }
    }
    fetchProject();
  }, []);

  if (!loading) {
    if (!project.isAxiosError)
      return (
        <Container style={{ padding: "20px" }}>
          <Box>
            <Typography variant="h2" align="center" color="error">
              {project && project.project.name}
            </Typography>

            <Box border={1}>
              <Typography variant="h5" align="center">
                {project && project.project.description}
              </Typography>
            </Box>

            <Container
              style={{
                width: "40%",
                float: "right",
                align: "left",
                padding: "20px",
              }}
            >
              <Typography align="right" variant="h6">
                <Box border={1}>
                  <Typography style={{ float: "left", marginLeft: "5px" }}>
                    Created on:{" "}
                    {moment(project.project.createdAt, "YYYY-MM-DD")
                      .format("MMM Do YYYY")
                      .toString()}
                  </Typography>
                  <Typography style={{ marginRight: "5px" }}>
                    Company: {project.project.company}
                  </Typography>
                  <div
                    style={{
                      justify: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h7" style={{ padding: "5px" }}>
                      {"Manager: "}
                      {project.manager.firstName} {project.manager.lastName} (
                      {project.manager.username})
                      <Avatar
                        className={classes.avatar}
                        src={project.manager.photo}
                        fontSize="large"
                      />
                    </Typography>
                  </div>
                </Box>
              </Typography>
            </Container>
            <Container
              style={{
                width: "50%",
                float: "left",
                align: "left",
                padding: "20px",
              }}
            >
              <Box border={1}>
                <Typography align="center" variant="h5">
                  Team:
                </Typography>
                {project.team.map((teamMember, key) => member(teamMember))}
              </Box>
            </Container>
          </Box>
        </Container>
      );
    return (
      <Typography color="secondary" variant="h2" align="center">
        No Access
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" style={{ height: "100hv" }} />
    </div>
  );
}
