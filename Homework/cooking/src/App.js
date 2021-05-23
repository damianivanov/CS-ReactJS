import Nav from "../src/NavBar/Nav";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import AddRecipe from "./AddRecipe/AddRecipe";
import "./App.css";
import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { activeUser } from "./services/userService";
import {activeDarkMode} from './services/darkMode'
import Recent from "./recentRecipes/recentRecipes";


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
        {/* <Paper style={{ height: "100vh" }}> */}
          <Nav
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            signed={signed}
            setSigned={setSigned}
          />
          <Switch>
            <Route path="/login">
              <Login setSigned={setSigned} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/recipes">
              <AddRecipe signed={signed} />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/recent">
              <Recent/>
            </Route>
            <Route exact path="/">
              <h1>Home</h1>
            </Route>
          </Switch>
        {/* </Paper> */}
      </ThemeProvider>
    </Router>
  );
}
export default App;
