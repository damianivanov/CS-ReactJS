import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import {Link} from 'react-router-dom'
export default function LeftDrawer() {

  const [open, setOpen] = React.useState(false);

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

      <Link to="/projects" style={{ color: "white", textDecoration: "none" }}>
          <ListItem button>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary={"My Projects"} />
          </ListItem>
        </Link>

        <Link to="/join" style={{ color: "white", textDecoration: "none" }}>
          <ListItem button>
            <ListItemIcon>
              <LibraryAddOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Join Project"} />
          </ListItem>
        </Link>

      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
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
