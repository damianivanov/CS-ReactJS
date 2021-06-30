import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import {
    editTask,
  deleteTask,
  getTaskForProject,
} from "../../services/taskService";
import DeleteIcon from "@material-ui/icons/Delete";
import { store } from "react-notifications-component";
import {
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  NativeSelect,
  InputLabel,
  List,ListItem
} from "@material-ui/core";


export default function TasksModal(props) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({});
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [error, setError] = useState("");
const [date,setDate] = useState(new Date())

  const taskInfo = (task, key) => {
    return (
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <span>{task.label} /</span>

        <IconButton edge="end" aria-label="complete">
          <EditIcon
            onClick={() => {
              setTask(task);
              setEditOpen(true);
            }}
          />
        </IconButton>
        {!task.deleted && (
          <IconButton edge="end" aria-label="complete">
            <DeleteIcon
              onClick={() => {
                setTask(task);
                setDeleteOpen(true);
              }}
            />
          </IconButton>
        )}
      </div>
    );
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

    const fetchTasks = async () => {
      getTaskForProject(props.project.id)
        .then((tasks) => {
          setTasks(tasks);
        })
        .catch((error) => console.log(error));
    };

  useEffect(() => {
    fetchTasks()
  }, [props.project.id,date]);

  const handleTaskDelete = () => {
    setDeleteOpen(false);
    deleteTask(task._id) // .lean() in api
      .then((res) => {
        if (res.status === 200) {
          setDate(new Date());
          store.addNotification({
            title: "Success!",
            message: `Deleted ${task.label}`,
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
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setError(err.response.data);
      });
    setTask({});
  };

  const handleTasksClose = () => {
    setTasks([]);
    props.setOpen(false);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEdit = () => {
      editTask(task)
        .then((res) => {
          if (res.status === 200) {
            store.addNotification({
              title: "Success!",
              message: `Edited ${task.label}`,
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
            props.setOpen(false);
          } else {
            setError(res.data.message);
          }
        })
        .catch((err) => {
          setError(err.response.data);
        });
    
  };
  return (
    <React.Fragment>
      <Dialog open={props.tasksOpen} onClose={handleTasksClose}>
        <DialogTitle id="form-dialog-title">
          Edit {props.project.name}{" "}
        </DialogTitle>
        <DialogContent>
          {tasks && tasks.map((task, key) => taskInfo(task, key))}
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle id="alert-dialog-title">
          {`Do you want to delete ${task.label}`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleTaskDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit {task.label} </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            id="label"
            name="label"
            label="Label"
            value={task["label"]}
            onChange={handleChange}
          />
          <InputLabel id="status">Status</InputLabel>
          <NativeSelect
            id="status"
            name="status"
            value={task["status"]}
            onChange={handleChange}
          >
            <option value={"active"}>Active</option>
            <option value={"review"}>Review</option>
            <option value={"done"}>Done</option>
          </NativeSelect>

          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            multiline
            fullWidth
            rows={4}
            value={task["description"]}
            onChange={handleChange}
          />
          <List>
              <span>Sub Tasks: </span>
              {task.subTasks && task.subTasks.map((subTask)=>(<ListItem>{subTask}</ListItem>))}
              </List> 
              <hr/>
          <InputLabel id="deleted">Deleted</InputLabel>
          <NativeSelect
            id="deleted"
            name="deleted"
            value={task["deleted"]}
            onChange={handleChange}
          >
            <option value={false}>Active</option>
            <option value={true}>Deleted</option>
          </NativeSelect>
          <TextField
            margin="dense"
            id="assignorId"
            name="assignorId"
            label="AssignorId Id"
            fullWidth
            value={task["assignorId"]}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="assigneeId"
            name="assigneeId"
            label="Assignee Id"
            fullWidth
            value={task["assigneeId"]}
            onChange={handleChange}
          />

          <TextField
            id="datetime-local"
            label="Start date"
            name="startDate"
            type="datetime-local"
            value={task["startDate"]}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="datetime-local"
            label="Due date"
            name="dueDate"
            type="datetime-local"
            value={task["dueDate"]}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginLeft: "10px" }}
          />
          {error && (
            <Typography color="secondary" float="left">
              {" "}
              {error}{" "}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>

          <Button onClick={handleEdit.bind(this)} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
