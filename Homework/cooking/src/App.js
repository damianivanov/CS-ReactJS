import Nav from "../src/NavBar/Nav";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Recipes from "./Recipes/Recipes";
import Dashboard from "./Dashboard/Dashboard";
import "./App.css";
import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { activeUser } from "./services/userService";
import {activeDarkMode} from './services/darkMode'

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
        <Paper style={{ height: "100vh" }}>
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
              <Recipes signed={signed} />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/">
              <Dashboard />
            </Route>
          </Switch>
        </Paper>
      </ThemeProvider>
    </Router>
  );
}
export default App;
