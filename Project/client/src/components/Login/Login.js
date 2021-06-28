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
import { checkJWT, login } from "../../services/userService";
import { Redirect, useHistory, Link } from "react-router-dom";
import { getActiveUser } from "../../services/userService";
export default function Login(props) {
  const classes = useStyles();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function formSubmit(e) {
    e.preventDefault();
    const user = checkJWT()
    if (!user) {
      login({username,password}).then((res) => {
        if (res.status === 200) {
          console.log("Logged In")
          props.setSigned(true);
          props.setLoggedUser(getActiveUser())
          history.replace("/");
        } else {
          // console.log(res.data)
          // setError(res.data.message);
          //the error message have too much info for existing users
          setError("Invalid Credentials!"); 
        }
      }).catch((err) => {
        console.log(err)
        setError(err.response.data.message); //not sure if it's data.message
      });    
    } else {
      setError("Invalid Credentials!");
    }
  }
  
  if(props.signed)
  return <Redirect to="/" />

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