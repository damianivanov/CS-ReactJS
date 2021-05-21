import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./Login.styles";
import {Container} from "@material-ui/core";
import { checkUser, login } from "../services/userService";
import { Redirect, useHistory,useLocation } from "react-router-dom";

export default function Login(props) {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function formSubmit(e) {
    e.preventDefault();
    let user = checkUser({ username: username, password: password });
    if (user) {
      login(user);
      props.setSigned(true);

      let { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
      <Redirect to="/" />;
    } else {
      setError("Invalid Credentials!");
    }
  }
  return (
      <Container component="main" maxWidth="xs" >
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <form className={classes.form} onSubmit={formSubmit.bind(this)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error !== "" && (
              <Typography color="secondary"> {error} </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onChange={(e) => setPassword(e.target.value)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2" style={{ color: "#f50057" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="/register"
                  variant="body2"
                  style={{ color: "#f50057" }}
                >
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
  );
}
