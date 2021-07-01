import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url("Teamwork.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
    Link: {
        color: "white",
        textDecoration: "none",
      },
  }));

export default function Dashboard(props) {
  const classes = useStyles();

 if(!props.signed) 
  return (
    <React.Fragment>
      <Paper><br></br></Paper>
      <div
        className={classes.mainFeaturedPost}
        style={{ backgroundImage: `url("Teamwork.jpg")` }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: "none" }}
            src={"Teamwork.jpg"}
            alt={"Teamwork"}
          />
        }
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component="h1" variant="h3" gutterBottom>
                Project Manager Tool
              </Typography>
              <Typography component="h3" variant="h3" gutterBottom>
                The easiest way to manage your projects
              </Typography>
              <Typography variant="h5">
                {
                  "Project Manager Tool - easy way to assign,and complete tasks for your projects."
                }
              </Typography>
              <Typography variant="h5">
                {"It's Fast and Easy to use."}
              </Typography>
              <Typography variant="h5" paragraph>
                {"Try it now..."}
              </Typography>
              <Button href="/login" variant="contained" color="secondary">
                {"Get Started"}
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );

  return <Redirect to="/account" />;
}

