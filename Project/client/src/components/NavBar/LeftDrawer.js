import React,{useEffect} from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from 'react-router-dom'




export default function LeftDrawer(props,linkColor) {


  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    return () => {
      console.log(props.date)
    }
  }, [props.date])

  const toggleDrawer = (value) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(value);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link to="/projects" style={{ color: props.linkColor, textDecoration: "none" }}>
          <ListItem button>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary={"Projects"} />
          </ListItem>
        </Link>

        <Link to="/tasks" style={{ color: props.linkColor, textDecoration: "none" }}>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={"Tasks"} />
          </ListItem>
        </Link>

        <Link to="/join" style={{ color: props.linkColor, textDecoration: "none" }}>
          <ListItem button>
            <ListItemIcon>
              <LibraryAddOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Join Project"} />
          </ListItem>
        </Link>

        {props.props.loggedUser && (props.props.loggedUser.role === "admin" ||
          props.props.loggedUser.role === "manager") && (
          <Link to="/create" style={{ color: props.linkColor, textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <LibraryAddOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Create Project"} />
            </ListItem>
          </Link>
        )}
      </List>
      <Divider />
      
    </div>
  );

  return (
      
        <React.Fragment key={'left'}>
          <Button onClick={toggleDrawer(true)}>
        <MenuIcon style={{color:"white"}}/>
          </Button>
          <SwipeableDrawer
            anchor={'left'}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
  );
}
