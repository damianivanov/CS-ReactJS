import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import IconButton from '@material-ui/core/IconButton';
import {Redirect} from 'react-router-dom'
import { getJWT } from "../../services/userService";
import { getMytasks } from '../../services/taskService';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop:"10px"
  },
}));

export default function CheckboxList({props}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [tasks, setTasks] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleComplete = (value) => () =>{
    console.log(value)
  }

  useEffect(() => {
    const fetchTasks= async ()=>{
      if (getJWT())
      getMytasks().then((tasks) => {
        console.log(tasks);
        setTasks(tasks);
      });
    }
    fetchTasks()
  }, [])

  if(!props.signed) return <Redirect to="/login" />

  return (
    <React.Fragment>
      <Box border={1}>
        <ListItem>
       
          <ListItemText
            primary={`Task Label`}
            style={{ maxWidth: "45%" }}
            primaryTypographyProps={{ variant: "h4" }}
          />
          <ListItemText
            primary={`Task status`}
            style={{  }}
            primaryTypographyProps={{ variant: "h4", style:{textAlign:"center"} }}
          />

           <ListItemText
          primary={`Mark as complete`}
          primaryTypographyProps={{ variant: "h5", style:{float:"right"} }}
        />
        </ListItem>
      </Box>

      <List className={classes.root}>
        {tasks.map((task) => {
          const labelId = `checkbox-list-label-${task.label}`;

          return (
            <ListItem
              key={task.id}
              role={props.loggedUser.role}
              dense
              button
              onClick={handleToggle(task)}
              component="a"
              href={`/tasks/${task.id}`}
            >
              <ListItemText
                id={labelId}
                primary={task.label}
                style={{ maxWidth: "48%" }}
                primaryTypographyProps={{ variant: "h5"}}
              />
              <ListItemText
                id={labelId}
                primary={task.status}
                style={{ textAllign:"center",padding:"10px" }}
              />

              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="complete">
                  <DoneOutlineIcon onClick={handleComplete(task)} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
}
