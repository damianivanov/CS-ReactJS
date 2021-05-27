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
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { withRouter } from "react-router-dom";
import { insertRecipe } from "../services/recipesService";

class AddRecipe extends React.Component {
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

    if (typeof fields.name !== "undefined") {
      if (!fields.name.length > 80) {
        errors["name"] = "The name should be less than 80 characters";
      }
    }

    if (fields["short_description"].length > 256) {
      formIsValid = false;
      errors["short_description"] =
        "Short description should be less than 256 characters";
    }

    if (fields["description"].length > 2048) {
      formIsValid = false;
      errors["description"] = "Description should be less than 2048 characters";
    }

    if (fields["time"] < 0) {
      formIsValid = false;
      errors["time"] = "Time should be more than 0 minutes ";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  formSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      insertRecipe(this.state.fields);
      this.props.history.push("/recipes");
    }
  }

  handleChange(field, e) {
    if (field === "keywords") {
      this.setState((prevState) => ({
        fields: {
          ...prevState.fields,
          [field]: e,
        },
      }));
    } else {
      this.setState((prevState) => ({
        fields: {
          ...prevState.fields,
          [field]: e.target.value,
        },
      }));
    }
  }

  handleDeleteChip(keyword, index) {
    this.setState((prevState) => ({
      fields: {
        ...prevState.fields,
        keywords: prevState.fields.keywords.filter((word) => word !== keyword),
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
            Add Recipe
          </Typography>
          <form
            style={{ padding: "20px" }}
            onSubmit={this.formSubmit.bind(this)}
            autoComplete="off"
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
                  id="short description"
                  label="Short description"
                  name="short description"
                  value={this.state.fields["short_description"]}
                  onChange={this.handleChange.bind(this, "short_description")}
                  error={this.state.errors["short_description"]}
                  helperText={this.state.errors["short_description"]}
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
                  value={this.state.fields["ingredients"]}
                  onChange={this.handleChange.bind(this, "ingredients")}
                  error={this.state.errors["ingredients"]}
                  helperText={this.state.errors["ingredients"]}
                />
              </Grid>
              <Grid item xs={12}>
                <ChipInput
                  fullWidth
                  label="Keywords"
                  value={this.state.fields["keywords"]}
                  onChange={this.handleChange.bind(this, "keywords")}
                  onDelete={this.handleDeleteChip.bind(this)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  multiline
                  rows={10}
                  id="Description"
                  label="Description"
                  name="description"
                  value={this.state.fields["description"]}
                  onChange={this.handleChange.bind(this, "description")}
                  error={this.state.errors["description"]}
                  helperText={this.state.errors["description"]}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Input
                  id="time"
                  value={this.state.fields["time"]}
                  required
                  onChange={this.handleChange.bind(this, "time")}
                  endAdornment={
                    <InputAdornment position="end">Mins.</InputAdornment>
                  }
                  error={this.state.errors["time"]}
                  helperText={this.state.errors["time"]}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Input
                  id="url"
                  value={this.state.fields["photo"]}
                  required
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
      </React.Fragment>
    );
  }
}
export default withRouter(AddRecipe);
