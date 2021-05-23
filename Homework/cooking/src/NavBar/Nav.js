import React from "react";
import {
  Menu,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Paper,
} from "@material-ui/core";
import { useStyles } from "./Nav.styles";
import yellow from "@material-ui/core/colors/yellow";
import Toggle from "react-toggle";
import "./Toggle.css";
import { logOut } from "../services/userService";
import { Link, useHistory, useLocation } from "react-router-dom";

import { deactivateDarkMode, activateDarkMode } from "../services/darkMode";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import FastfoodIcon from "@material-ui/icons/Fastfood";

export default function Nav(props) {
  const [linkColor, setColor] = React.useState("black");
  function changeTheme() {
    if (props.darkMode) {
      props.setDarkMode(false);
      deactivateDarkMode();
      setColor("black");
    } else {
      props.setDarkMode(true);
      activateDarkMode();
      setColor("white");
    }
  }

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const toggler = (
    <Toggle
      defaultChecked={!props.darkMode}
      icons={{
        unchecked: (
          <NightsStayIcon
            style={{
              color: "white",
              fontSize: 17,
              position: "relative",
              bottom: "0.15em",
            }}
          />
        ),
        checked: (
          <WbSunnyIcon
            style={{
              color: yellow[500],
              fontSize: 17,
              position: "relative",
              bottom: "0.15em",
            }}
          />
        ),
      }}
      onChange={changeTheme}
    />
  );

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  let history = useHistory();
  let location = useLocation();

  function onLogOut() {
    props.setSigned(false);
    logOut();
    let { from } = location.state || { from: { pathname: "/" } };
    history.replace(from);
    history.push("/login");
    handleMenuClose();
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={onLogOut}>Sign Out</MenuItem>
    </Menu>
  );

  const noUser = (
    <React.Fragment>
      <Button
        size="medium"
        variant="contained"
        color="secondary"
        className={classes.margin}
        style={{ marginLeft: "5px" }}
      >
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          {" "}
          Login
        </Link>
      </Button>
      <Button
        size="medium"
        variant="contained"
        color="secondary"
        className={classes.margin}
        style={{ marginLeft: "5px" }}
      >
        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
          {" "}
          Register
        </Link>
      </Button>
    </React.Fragment>
  );

  const signedUser = (
    <React.Fragment>
      <Button style={{ margin: "2px" }}>
        <Link
          to="/dashboard"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>
      </Button>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </React.Fragment>
  );

  const noUserMenu = [
    <MenuItem
      size="medium"
      variant="contained"
      color="secondary"
      className={classes.margin}
      style={{ marginLeft: "5px" }}
    >
      <Link to="/login" style={{ color: linkColor, textDecoration: "none" }}>
        {" "}
        Login
      </Link>
    </MenuItem>,
    <MenuItem
      size="medium"
      variant="contained"
      color="secondary"
      className={classes.margin}
      style={{ marginLeft: "5px" }}
    >
      <Link to="/register" style={{ color: linkColor, textDecoration: "none" }}>
        {" "}
        Register
      </Link>
    </MenuItem>,
  ];
  const signedUserMenu = [
    <MenuItem>
      <Link
        to="/dashboard"
        style={{ color: linkColor, textDecoration: "none" }}
      >
        Dashboard
      </Link>
    </MenuItem>,
    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>,
    <MenuItem onClick={handleMenuClose}>My account</MenuItem>,
    <MenuItem onClick={onLogOut}>Sign Out</MenuItem>,
  ];

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {props.signed ? signedUserMenu : noUserMenu}
      <div container style={{ marginLeft: "16px" }}>
        {toggler}
      </div>
    </Menu>
  );

  return (
    <Paper>
      <div className={classes.grow}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <IconButton style={{ borderRadius: "2%" }}>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                <Typography className={classes.title} variant="h5" noWrap>
                  <FastfoodIcon p={2} /> Cooking Recipes
                </Typography>
              </Link>
            </IconButton>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {toggler}

              {props.signed ? signedUser : noUser}
            </div>

            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </Paper>
  );
}
