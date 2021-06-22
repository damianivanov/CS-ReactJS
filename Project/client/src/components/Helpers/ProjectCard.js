import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const moment = require('moment');

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ProjectCard({project}) {
  const classes = useStyles();
  let date = moment(project.createdAt, 'YYYY-MM-DD')

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
        </Typography>
        <Typography variant="h4" component="h1" align="center">{project.name}</Typography>
        <Typography className={classes.pos} color="textSecondary" align="right">
          {project.company}
        </Typography>
        <Typography variant="subtitle2" component="p" gutterBottom>
          {project.description.substr(0, 100)}
          <br />
          <Typography variant="caption" component="p" gutterBottom align="right">{date.format("MMM Do YYYY")}</Typography>
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`/project/${project.id}`}>See Project
        </Button>
      </CardActions>
    </Card>
  );
}
