import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Grid, IconButton,Link } from "@material-ui/core";

import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: "1rem",
    padding: "0.5rem",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
  },
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Paper elevation={3} variant="outlined" c>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Typography align="center">
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <Link href="https://github.com/damianivanov">
              {" "}
              Project Manager Tool
            </Link>
          </Typography>

          <div>
            <IconButton
              edge="end"
              aria-label="complete"
              component="a"
              href="https://github.com/damianivanov"
              target="_blank"
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="complete"
              component="a"
              href="https://www.instagram.com/damian.ivanovv/"
              target="_blank"
            >
              <InstagramIcon fontSize="large" />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="complete"
              component="a"
              href="https://www.facebook.com/Dam1aan/"
              target="_blank"
            >
              <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="complete"
              component="a"
              href="https://www.linkedin.com/in/damian-ivanov-5b1327176/"
              target="_blank"
            >
              <LinkedInIcon fontSize="large" />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="complete"
              component="a"
              href="https://twitter.com/Damian_Iv"
              target="_blank"
            >
              <TwitterIcon fontSize="large" />
            </IconButton>
          </div>
        </Grid>
      </Paper>
    </div>
  );
}
