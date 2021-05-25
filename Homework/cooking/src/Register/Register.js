import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";
import { insertUser } from "../services/userService";

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
    if (!fields["fullname"]) {
      formIsValid = false;
      errors["fullname"] = "Cannot be empty";
    }

    if (typeof fields["fullname"] !== "undefined") {
      if (!fields["fullname"].match(/(\w.+\s).+/)) {
        formIsValid = false;
        errors["fullname"] = "Only letters";
      }
    }

    //username
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "Cannot be empty";
    }

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["username"] = "Only letters";
      }
      if (fields["username"].length > 15 || fields["username"].length < 3) {
        formIsValid = false;
        errors["username"] = "username should be between 3 and 15 characters";
      }
    }

    //password
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Password cannot be empty";
    }

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
    if (!fields["confirm password"]) {
      formIsValid = false;
      errors["confirm password"] = "Confirm your password";
    }

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
      insertUser(this.state.fields);
      this.props.history.push("/login");
    }
  }

  handleChange(field, e) {
    // const tmpfields = this.state.fields;
    // tmpfields[field] = e.target.value;
    // this.setState( tmpfields);
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
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                value={this.state.fields["fullname"]}
                onChange={this.handleChange.bind(this, "fullname")}
                label="Full Name"
                error={this.state.errors["fullname"]}
                helperText={this.state.errors["fullname"]}
                autoFocus
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
