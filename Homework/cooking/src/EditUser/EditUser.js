import React from "react";
import {
  TextField,
  Input,
  InputAdornment,
  Typography,
  Container,
  CssBaseline,
  Grid,
  Button,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { editUser, getUser } from "../services/userService";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    const user = getUser(props.match.params.userId);
    user.photo = user.photo.includes(
      user.gender ? "public/male-avatar.png" : "public/woman-avatar.png"
    )
      ? ""
      : user.photo;
    this.state = {
      fields: user,
      errors: {},
    };
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //bio
    if (fields["bio"].length > 512) {
      formIsValid = false;
      errors["bio"] = "Bio should be less than 512 characters";
    }

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

    this.setState({ errors: errors });
    return formIsValid;
  }

  formSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      editUser(this.state.fields);
      this.props.history.push("/users");
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push("/users");
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
      <React.Fragment>
        <Container
          component="main"
          maxWidth="xs"
          style={{ height: "100%", marginTop: "20px" }}
        >
          <CssBaseline />
          <Typography component="h1" variant="h4" align="center">
            Edit User
          </Typography>
          <form
            style={{ padding: "20px" }}
            onSubmit={this.formSubmit.bind(this)}
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Fullname"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  value={this.state.fields["fullname"]}
                  onChange={this.handleChange.bind(this, "fullname")}
                  label="Users's Fullname"
                  error={this.state.errors["fullname"]}
                  helperText={this.state.errors["fullname"]}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  value={this.state.fields["username"]}
                  onChange={this.handleChange.bind(this, "username")}
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
              <Grid item xs={12} sm={6} container center="true">
                <InputLabel>Role</InputLabel>
                <Select
                  id="role"
                  value={this.state.fields["role"]}
                  onChange={this.handleChange.bind(this, "role")}
                  fullWidth
                  required
                >
                  <MenuItem value={"user"}>User</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={10}
                  id="bio"
                  label="Bio"
                  name="bio"
                  value={this.state.fields["bio"]}
                  onChange={this.handleChange.bind(this, "bio")}
                  error={this.state.errors["bio"]}
                  helperText={this.state.errors["bio"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>Status</InputLabel>
                <Select
                  id="status"
                  value={this.state.fields["status"]}
                  onChange={this.handleChange.bind(this, "status")}
                  fullWidth
                  required
                >
                  <MenuItem value={"active"}>Active</MenuItem>
                  <MenuItem value={"suspended"}>Suspended</MenuItem>
                  <MenuItem value={"deactivated"}>Deactivated</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: "15px" }}>
                <Input
                  id="url"
                  value={this.state.fields["photo"]}
                  fullWidth
                  label="Photo URL"
                  endAdornment={
                    <InputAdornment position="end">URL</InputAdornment>
                  }
                  onChange={this.handleChange.bind(this, "photo")}
                  error={this.state.errors["photo"]}
                  helperText={this.state.errors["photo"]}
                />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Button
                item
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
              >
                Save Changes
              </Button>
              <Button
                item
                variant="contained"
                color="secondary"
                onClick={this.handleCancel.bind(this)}
                style={{ marginTop: "10px" }}
              >
                Cancel
              </Button>
            </Grid>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}
export default withRouter(EditUser);
