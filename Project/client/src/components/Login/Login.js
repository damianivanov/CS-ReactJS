import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useStyles } from "./Login.styles";
import {
  Container,
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";
import { activeUser, login } from "../../services/userService";
import { Redirect, useHistory, useLocation, Link } from "react-router-dom";

export default function Login(props) {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function formSubmit(e) {
    e.preventDefault();
    const user = activeUser()
    if (!user) {
      login({username,password});
      props.setSigned(true);
      let { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
      <Redirect to="/" />;
    } else {
      setError("Invalid Credentials!");
    }
  }
  return (
    <Container component="main" maxWidth="xs">
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

          {error !== "" && <Typography color="secondary"> {error} </Typography>}

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
              <Link
                to="/forgotPassword"
                variant="body2"
                className={classes.Link}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2" className={classes.Link}>
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
