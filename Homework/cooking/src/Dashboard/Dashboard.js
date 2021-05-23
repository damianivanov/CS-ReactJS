import React from "react";
import { Button, CssBaseline, GridList, Grid,Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    margin: "20px",
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
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

export default function Dashboard() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline /> 
      {/* <Container component="main" style={{justifyContent:"flex-start"}}> */}
      <div className={classes.root}>
        <GridList xs >

          <Grid >
            <Button variant="contained" color="secondary" xs={2}>
              <Link
                to="/recipes"
                style={{ color: "white", textDecoration: "none" }}
              >
                Post Recipe
              </Link>
            </Button>
          </Grid>
          <Grid >
            <Button variant="contained" color="secondary">
              <Link
                to="/recent"
                style={{ color: "white", textDecoration: "none" }}
              >
               Recent Recipes
              </Link>
            </Button>
          </Grid>
          <Grid >
            <Button variant="contained" color="secondary">
              <Link
                to="/"
                style={{ color: "white", textDecoration: "none" }}
              >
                Post Recipe
              </Link>
            </Button>
          </Grid>
        
        </GridList>
      </div>
      {/* </Container> */}
    </React.Fragment>
  );
}
