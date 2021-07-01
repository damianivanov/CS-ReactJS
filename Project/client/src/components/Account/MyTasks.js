import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  NativeSelect,
  InputLabel,
  ListItemText,
  Box,
  ListItem,
} from "@material-ui/core";
import { completeTask } from '../../services/taskService';
import { store } from "react-notifications-component";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
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
  const [tasks, setTasks] = React.useState([]);
  const [modal, setModal] = React.useState([]);
  const [completeOpen, setCompleteOpen] = React.useState(false);
  const [date,setDate]= React.useState(new Date())

  const handleToggle = (task) => () =>{
  }
  const handleComplete = (task) => () =>{
    console.log(task)
    setModal(task)
    setCompleteOpen(true)
  }

  const handleCompleteClose = (value) => () =>{
    setCompleteOpen(false)
    setModal({})
  }

  const handleChange = (e) => {
    setModal({
      ...modal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if(props.loggedUser.userId !== modal.assignorId) modal.status="review"
      completeTask(modal)
        .then((res) => {
          if (res.status === 200) {
            store.addNotification({
              title: "Success!",
              message: `Completed ${modal.label}`,
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
            });
            setDate(new Date())
            setCompleteOpen(false)
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }


  useEffect(() => {
    const fetchTasks= async ()=>{
      if (getJWT())
      getMytasks().then((tasks) => {
        console.log(tasks);
        setTasks(tasks);
      }).catch((error)=>console.log(error));
    }
    fetchTasks()
  }, [date])

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
        {tasks && tasks.map((task) => {
          const labelId = `checkbox-list-label-${task.label}`;

          return (
            <ListItem>
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
                  primaryTypographyProps={{ variant: "h5" }}
                />
                <ListItemText
                  id={labelId}
                  primary={task.status}
                  style={{ textAllign: "center", padding: "10px" }}
                />

                <Dialog
                  open={completeOpen}
                  onClose={handleCompleteClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Edit {modal.label}
                  </DialogTitle>
                  <DialogContent>
                    {props.loggedUser.userId === modal.assignorId && (
                      <div>
                        <InputLabel id="status">Status</InputLabel>
                        <NativeSelect
                          id="status"
                          name="status"
                          value={modal["status"]}
                          onChange={handleChange}
                        >
                          <option value={"active"}>Active</option>
                          <option value={"review"}>Review</option>
                          <option value={"done"}>Done</option>
                        </NativeSelect>
                      </div>
                    )}

                    <TextField
                      margin="dense"
                      id="taskResult"
                      name="taskResult"
                      label="Task Result"
                      multiline
                      rows={5}
                      value={modal["taskResult"]}
                      onChange={handleChange}
                    />
                  </DialogContent>

                  <DialogActions>
                    <Button onClick={handleCompleteClose} color="primary">
                      Cancel
                    </Button>

                    <Button onClick={handleSubmit} color="secondary">
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </ListItem>

              <IconButton edge="end" aria-label="complete">
                <DoneOutlineIcon onClick={handleComplete(task)} />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
}
