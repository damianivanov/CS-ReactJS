import React from "react";
import {
  TextField,
  CssBaseline,
  Button,
  Grid,
  Typography,
  Container,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import {  } from "../../services/userService";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
    };
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //fullname
    if (typeof fields["firstName"] !== "undefined") {
      if (!fields["firstName"].match(/^[a-z ,.'-]+$/i)) {
        formIsValid = false;
        errors["firstName"] = "Only letters";
      }
    }
    //lastname
    if (typeof fields["lastName"] !== "undefined") {
      if (!fields["lastName"].match(/^[a-z ,.'-]+$/i)) {
        formIsValid = false;
        errors["lastName"] = "Only letters";
      }
    }

    //username
    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-z0-9_-]{3,15}$/)) {
        formIsValid = false;
        errors["username"] =
          "The username should contain only letters,digits, - or _";
      }
    }

    //password
    if (typeof fields["password"] !== "undefined") {
      if (
        !fields["password"].match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        )
      ) {
        formIsValid = false;
        errors["password"] =
          "Minimum 8 characters, at least 1 letter, 1 number and 1 special character: ";
      }
    }

    //confirm password
    if (typeof fields["confirm password"] !== "undefined") {
      if (fields["confirm password"] !== fields["password"]) {
        formIsValid = false;
        errors["confirm password"] = "Passwords doesn't match";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  formSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      //insertUser(this.state.fields);
      this.props.history.push("/login");
    }
  }

  handleChange(field, e) {
    this.setState((prevState) => ({
      fields: {
        ...prevState.fields,
        [field]: e.target.value,
      },
    }));
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h4" align="center" p={5}>
          Sign up
        </Typography>
        <form style={{ padding: "10px" }} onSubmit={this.formSubmit.bind(this)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                value={this.state.fields["firstName"]}
                onChange={this.handleChange.bind(this, "firstName")}
                label="First Name"
                error={this.state.errors["firstName"]}
                helperText={this.state.errors["firstName"]}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                value={this.state.fields["lastName"]}
                onChange={this.handleChange.bind(this, "lastName")}
                label="Last Name"
                error={this.state.errors["lastName"]}
                helperText={this.state.errors["lastName"]}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={this.state.fields["username"]}
                onChange={this.handleChange.bind(this, "username")}
                autoComplete="username"
                error={this.state.errors["username"]}
                helperText={this.state.errors["username"]}
              />
            </Grid>
            <Grid item xs={12} sm={6} container center="true">
              <InputLabel>Gender</InputLabel>
              <Select
                id="gender"
                value={this.state.fields["gender"]}
                onChange={this.handleChange.bind(this, "gender")}
                fullWidth
                required
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={0}>Female</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={this.state.fields["password"]}
                onChange={this.handleChange.bind(this, "password")}
                autoComplete="current-password"
                error={this.state.errors["password"]}
                helperText={this.state.errors["password"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm password"
                label="Confirm Password"
                type="password"
                id="confirm password"
                value={this.state.fields["confirm password"]}
                onChange={this.handleChange.bind(this, "confirm password")}
                autoComplete="current-password"
                error={this.state.errors["confirm password"]}
                helperText={this.state.errors["confirm password"]}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            Sign Up
          </Button>
          <Grid container justify="center" style={{ padding: "10px" }}>
            <Link to="/login" variant="body2" style={{ color: "#f50057" }}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default withRouter(Register);
