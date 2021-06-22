import "./App.css";
import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Nav from "../src/components/NavBar/Nav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Account from "./components/Account/Account";
import MyTasks from "./components/Account/MyTasks";
import MyProjects from "./components/Account/MyProjects";
import JoinProject from "./components/Helpers/JoinProject";
import Project from "./components/Project/Project";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { checkJWT, getActiveUser } from "./services/userService";
import { activeDarkMode } from "./services/darkMode";
import { CssBaseline } from "@material-ui/core";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
function App() {
  const [signed, setSigned] = useState(checkJWT);
  const [darkMode, setDarkMode] = useState(activeDarkMode);
  const [loggedUser, setLoggedUser] = useState(getActiveUser());
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
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
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
            <Account
              signed={signed}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
            />
          </Route>


          <Route path="/tasks">
            <MyTasks
              props={{ signed:signed,
                loggedUser:loggedUser,
                setLoggedUser:setLoggedUser}}
            />
          </Route>

          <Route path="/projects">
            <MyProjects
              signed={signed}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
            />
          </Route>
          <Route path="/join">
            <JoinProject
              signed={signed}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
            />
          </Route>
          <Route path="/project/:projectId" component={(props) => <Project signed={signed} props={props}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser} />}/>
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
