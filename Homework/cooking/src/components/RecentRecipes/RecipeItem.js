import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Typography,
  IconButton,
  Box,
  Avatar,
  Collapse,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Recipe({ props }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} style={{ margin: "10px" }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.user[0].toUpperCase()}
          </Avatar>
        }
        title={props.name}
        subheader={`By: ${props.user} on  ${new Date(
          props.createdAt
        ).toLocaleDateString()}`}
        fontWeight="fontWeightBold"
      />
      <CardMedia
        className={classes.media}
        image={props.photo}
        style={{ backgroundSize: "contain" }}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.short_description}
        </Typography>
      </CardContent>
      <Box p={1}>
        <Typography variant="h7">
          {" "}
          keywords: {props.keywords.join(" , ")}{" "}
        </Typography>
      </Box>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>{props.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
