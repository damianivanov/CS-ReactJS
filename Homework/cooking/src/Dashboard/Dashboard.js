import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField, Input, InputAdornment } from "@material-ui/core";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ChipInput from "material-ui-chip-input";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect, withRouter } from "react-router-dom";
import { insertUser } from "../services/userService";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
    };
  }

  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    //fullname

    if (typeof fields.name !== "undefined") {
      if (!fields.name.length > 80) {
        errors["name"] = "The name should be less than 80 characters";
      }
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
      this.props.history.push("/");
      <Redirect to="/" />;
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState(fields);
  }
  handleAddChip(keyword) {
    this.setState(this.state.fields.keywords.push(keyword));
  }
  handleDeleteChip(keyword) {
    this.setState(
      this.state.fields.keywords.filter(function (item) {
        return item !== keyword;
      })
    );
  }
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography
          component="h1"
          variant="h4"
          align="center"
          p={5}
        ></Typography>
        <form
          style={{ padding: "10px" }}
          onSubmit={this.formSubmit.bind(this)}
          autocomplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="name"
                value={this.state.fields["name"]}
                onChange={this.handleChange.bind(this, "name")}
                label="Recipe's Name"
                error={this.state.errors["name"]}
                helperText={this.state.errors["name"]}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={4}
                id="short Description"
                label="Short description"
                name="short description"
                value={this.state.short_descrption}
                onChange={this.handleChange.bind(this, "short_descrption")}
                error={this.state.errors["short_descrption"]}
                helperText={this.state.errors["short_descrption"]}
              />
            </Grid>

            <Grid item xs={12} sm={6} align="end">
              <Input
                id="standard-adornment-weight"
                value={this.state.time}
                required
                onChange={this.handleChange.bind(this, "time")}
                endAdornment={
                  <InputAdornment position="end">Mins.</InputAdornment>
                }
                error={this.state.errors["time"]}
                helperText={this.state.errors["time"]}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="ingredients"
                label="Ingredients"
                id="ingredients"
                value={this.state.ingredients}
                onChange={this.handleChange.bind(this, "ingredients")}
                error={this.state.errors["ingredients"]}
                helperText={this.state.errors["ingredients"]}
              />
            </Grid>
            <Grid item xs={12}>
              <ChipInput
                fullWidth
                label="Keywords"
                value={this.state.keywords}
                onAdd={(keyword) => this.handleAddChip(keyword)}
                onDelete={(keyword, index) =>
                  this.handleDeleteChip(keyword, index)
                }
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
            Post
          </Button>
        </form>
      </Container>
    );
  }
}
export default withRouter(Dashboard);
