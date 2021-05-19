import Nav from '../src/NavBar/Nav';
import "./App.css";
import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper,Typography} from "@material-ui/core";
import { Router } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
  return (
      <ThemeProvider theme={theme}>
        <Paper style={{ height: "100hv" }}>
          <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
          <Typography variant="h3" noWrap gutterBottom> Hello World</Typography>
        </Paper>
      </ThemeProvider>
  );
}

export default App;
