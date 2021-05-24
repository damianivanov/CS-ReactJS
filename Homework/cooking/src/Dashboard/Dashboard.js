import React from "react";
import {
  Button,
  CssBaseline,
  ButtonGroup
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    margin: "10px",
    flexDirection: 'column',
    alignItems: 'start',
  
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  button: {
    margin:"5px"
  },
  Link:{
    color: "white", textDecoration: "none"
  }
})
);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      {/* <Container component="main" style={{justifyContent:"flex-start"}}> */}
      <div className={classes.root}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >

              <Button variant="contained" color="secondary" xs={2} className={classes.button}>
                <Link
                  to="/addrecipe"
                  className={classes.Link}
                >
                  Post Recipe
                </Link>
              </Button>

              <Button variant="contained" color="secondary" className={classes.button}>
                <Link
                  to="/recent"
                  className={classes.Link}
                >
                  Recent Recipes
                </Link>
              </Button>

              <Button variant="contained" color="secondary" className={classes.button}>
                <Link to="/recipes" className={classes.Link}>
                  All Recipes
                </Link>
              </Button>

              <Button variant="contained" color="secondary" className={classes.button}>
                <Link to="/" className={classes.Link}>
                  All Users
                </Link>
              </Button>
          </ButtonGroup>
      </div>
      {/* </Container> */}
    </React.Fragment>
  );
}
