import React from "react";
import {
  Menu,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Paper,
} from "@material-ui/core";
import { useStyles } from "./Nav.styles";
import yellow from "@material-ui/core/colors/yellow";
import Toggle from "react-toggle";
import "./Toggle.css";
import { logOut } from "../services/userService";
import { Link } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import FastfoodIcon from "@material-ui/icons/Fastfood";

function Nav(props) {
  function changeTheme() {
    if (props.darkMode) {
      props.setDarkMode(false);
    } else {
      props.setDarkMode(true);
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

  function onLogOut(){
    props.setSigned(false)
    logOut()
    handleMenuClose()
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
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <div style={{ marginLeft: 10 }}>{toggler}</div>
      </MenuItem>
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

  );
  return (
    <Paper>
      <div className={classes.grow}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <IconButton>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                <Typography className={classes.title} variant="h5" noWrap>
                  <FastfoodIcon p={2} /> Cooking Recipes
                </Typography>
              </Link>
            </IconButton>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={2} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={1} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
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

export default Nav;
