import "./App.css";
import Nav from "../src/components/NavBar/Nav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import Recent from "./components/RecentRecipes/RecentRecipes";
import RecipeList from "./components/RecipeList/RecipeList";
import UserList from "./components/UserList/UserList";
import EditRecipe from "./components/EditRecipe/EditRecipe";
import EditUser from "./components/EditUser/EditUser";
import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { activeUser } from "./services/userService";
import { activeDarkMode } from "./services/darkMode";
import { CssBaseline } from "@material-ui/core";

function App() {
  const [signed, setSigned] = useState(activeUser);
  const [darkMode, setDarkMode] = useState(activeDarkMode);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#051A28" : "#3f51b5" },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Nav
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          signed={signed}
          setSigned={setSigned}
        />
        <CssBaseline />
        <Switch>
          <Route path="/login">
            <Login setSigned={setSigned} />{" "}
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/addrecipe">
            <AddRecipe signed={signed} />
          </Route>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/recent" component={Recent} />
          <Route path="/users/edit/:userId" component={EditUser} />
          <Route path="/recipes/edit/:id" component={EditRecipe} />
          <Route path="/recipes" component={RecipeList} />
          <Route path="/users" component={UserList} />
          <Route path="/forgotPassword" component={forgotPassword}></Route>
          <Route exact path="/" component={Dashboard}></Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
export default App;

function forgotPassword() {
  return <h1>To be implemented...</h1>;
}
