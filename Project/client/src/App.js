import "./App.css";
import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Nav from "../src/components/NavBar/Nav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Account from "./components/Account/Account";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { checkJWT } from "./services/userService";
import { activeDarkMode } from "./services/darkMode";
import { CssBaseline } from "@material-ui/core";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
function App() {
  const [signed, setSigned] = useState(checkJWT);
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
        <ReactNotification />
        <CssBaseline />
        <Switch>
          <Route path="/login">
            <Login signed={signed} setSigned={setSigned} />
          </Route>

          <Route path="/register">
            <Register signed={signed} />
          </Route>

          <Route path="/account">
            <Account signed={signed} />
          </Route>

          {/* <Route path="/users/edit/:userId" component={EditUser} />
          <Route path="/users" component={UserList} /> */}
          {/* <Route path="/forgotPassword" component={forgotPassword}></Route> */}
          {/* <Route exact path="/" component={Dashboard}></Route> */}
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
