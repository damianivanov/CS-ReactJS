import React from "react";
import {
  TextField,
  CssBaseline,
  Button,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { createProject } from "../../services/projectService";
import { store } from "react-notifications-component";

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      error: "",
    };
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (typeof fields["name"] !== "undefined") {
      if (fields["name"].length<3) {
        formIsValid = false;
        errors["name"] = "Minimum 3 letters";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  formSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
        createProject(this.state.fields,this.props.loggedUser.userId)
        .then((res) => {
          if (res.status === 201) {
            store.addNotification({
              title: "Success!",
              message: "Created new project",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
            });
            this.props.history.push("/");
          } else {
            this.setState({ error: res.data });
          }
        })
        .catch((err) => {
          this.setState({ error: err.response.data });
        });
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
    if(this.props.loggedUser.role!=="admin"&&this.props.loggedUser.role!=="manager")
     return <Redirect to="/" />
     
    return (
      <Container component="main" maxWidth="xs" style={{marginTop:"5%"}}>
        <CssBaseline />
        <Typography component="h1" variant="h3" align="center" style={{marginBottom:"5%"}}>
          Create a Project
        </Typography>
        <form style={{ padding: "10px" }} onSubmit={this.formSubmit.bind(this)}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                autoComplete="pname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="name"
                value={this.state.fields["name"]}
                onChange={this.handleChange.bind(this, "name")}
                label="Project Name"
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
                  rows={8}
                  id="Description"
                  label="Description"
                  name="description"
                  value={this.state.fields["description"]}
                  onChange={this.handleChange.bind(this, "description")}
                  error={this.state.errors["description"]}
                  helperText={this.state.errors["description"]}
                />
              </Grid>
           <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="company"
                label="Company"
                id="company"
                value={this.state.fields["company"]}
                onChange={this.handleChange.bind(this, "company")}
                error={this.state.errors["company"]}
                helperText={this.state.errors["company"]}
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
            Create a project
          </Button>

          {this.state.error && this.state.error !== "" && (
            <Typography color="secondary" style={{textAlign:"center", padding:"5px"}}> {this.state.error} </Typography>
          )}

        </form>
      </Container>
    );
  }
}

export default withRouter(CreateProject);
