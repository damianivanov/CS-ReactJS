import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  editUser,
  getActiveUser,
  getFullAccount,
  getJWT,
  updateActiveUser,
} from "../../services/userService";
import {
  TextField,
  Avatar,
  Typography,
  Container,
  CssBaseline,
  Grid,
  Button,
  NativeSelect,
  InputLabel,
  Box,
} from "@material-ui/core";
import { store } from "react-notifications-component";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

export default function Account({ props }) {
  const classes = useStyles();
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (getJWT()) {
      getFullAccount().then((res) => {
        setFields(res);
      });
    }
  }, []);

  function handleValidation() {
    let errors = {};
    let formIsValid = true;

    //firstname
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

    setErrors(errors);
    return formIsValid;
  }

  const formSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      editUser(fields)
        .then((res) => {
          if (res.status === 200) {
            updateActiveUser(res.data);
            props.setLoggedUser(getActiveUser());
            store.addNotification({
              title: "Success!",
              message: "Edited successfully",
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
          } else {
            setError(res.data.message);
          }
        })
        .catch((err) => {
          setError(err.response.data);
        });
    }
  };

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <Container
        component="main"
        maxWidth="xs"
        style={{ height: "100%", marginTop: "20px" }}
      >
        <CssBaseline />
        <Typography component="h1" variant="h2" align="center">
          <Box fontWeight="fontWeightBold" m={1}>
            Edit user
          </Box>
        </Typography>
        <form
          style={{ padding: "20px" }}
          onSubmit={formSubmit}
          autoComplete="off"
        > 
          <Grid container spacing={2}>
            <Grid container item xs={12} justify="center">
              <Avatar className={classes.large} src={fields["photo"]} />
            </Grid>
            <Grid item xs={12} p={2}>
              <TextField
                fullWidth
                name="photo"
                value={(fields["photo"]==="male-avatar.png" || fields["photo"]==="woman-avatar.png") ? " " : fields["photo"]}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                value={fields["firstName"]}
                onChange={handleChange}
                error={errors["firstName"]}
                helperText={errors["firstName"]}
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
                value={fields["lastName"]}
                onChange={handleChange}
                error={errors["lastName"]}
                helperText={errors["lastName"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                name="username"
                value={fields["username"]}
                onChange={handleChange}
                error={errors["username"]}
                helperText={errors["username"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                name="email"
                value={fields["email"]}
                onChange={handleChange}
                error={errors["email"]}
                helperText={errors["email"]}
              />
            </Grid>
            <Grid item xs={12} sm={6} container center="true">
              <InputLabel id="gender">Gender</InputLabel>
              <NativeSelect
                id="gender"
                name="gender"
                value={fields["gender"]}
                onChange={handleChange}
                fullWidth
                required
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </NativeSelect>
            </Grid>
            <Grid item xs={12} sm={6} container center="true">
              <InputLabel id="role">Role</InputLabel>
              <NativeSelect
                id="role"
                name="role"
                value={fields["role"]}
                fullWidth
                disabled
              >
                <option value={"user"}>User</option>
                <option value={"admin"}>Admin</option>
                <option value={"manager"}>Manager</option>
              </NativeSelect>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            {error && (
              <Typography color="secondary" centered> {error} </Typography>
            )}

            <Button
              item
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}
