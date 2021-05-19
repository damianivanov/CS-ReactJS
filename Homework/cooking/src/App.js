import Nav from "../src/NavBar/Nav";
import Login from "./Login/Login";
import Register from "./Register/Register";
import "./App.css";
import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#051A28" : "#3f51b5" },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Paper height="100%">
          <Nav darkMode={darkMode} setDarkMode={setDarkMode} />

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Paper>
      </ThemeProvider>
    </Router>
  );
}
function Home() {
  return <h2>Home</h2>;
}

export default App;
