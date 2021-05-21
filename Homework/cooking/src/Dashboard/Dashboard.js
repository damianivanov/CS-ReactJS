import React from "react";
import { TextField, Input, InputAdornment,Typography,Container,CssBaseline,Grid,Button } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { withRouter } from "react-router-dom";
import { insertRecipe } from "../services/recipesService";

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

    if (fields["short_descrption"].length > 256) {
      formIsValid = false;
      errors["short_descrption"] =
        "Short description should be less than 256 characters";
    }

    if (fields["descrption"].length > 2048) {
      formIsValid = false;
      errors["descrption"] =
        "Description should be less than 2048 characters";
    }

    if (fields["time"] < 0) {
      formIsValid = false;
      errors["time"] = "Time should be more than 0 minutes ";
    }
    

    //confirm password

      if (fields["confirm password"] !== fields["password"]) {
        formIsValid = false;
        errors["confirm password"] = "Passwords doesn't match";
      }


    this.setState({ errors: errors });
    return formIsValid;
  }

  formSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      insertRecipe(this.state.fields);

      this.props.history.push("/");
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
      <Container component="main" maxWidth="xs" a>
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
                // onKeyDown={(e) => { if (e.code === 9) 
                //   e.preventDefault() }}
                onAdd={(keyword) => this.handleAddChip(keyword)}
                onDelete={(keyword, index) =>
                  this.handleDeleteChip(keyword, index)
                }    
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
                value={this.state.descriptipon}
                onChange={this.handleChange.bind(this, "descrption")}
                error={this.state.errors["descrption"]}
                helperText={this.state.errors["descrption"]}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Input
                id="time"
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
            <Grid item xs={12} sm={9}>
              <Input
                id="url"
                value={this.state.photo}
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
    );
  }
}
export default withRouter(Dashboard);
