import React, { useState } from "react";
import {TextField,Button} from "@material-ui/core";
import { store } from "react-notifications-component";
import { joinProject } from "../../services/projectService";

import {updateActiveUser,getActiveUser} from '../../services/userService'
import { useHistory } from "react-router-dom";

export default function JoinProject(props) {
  const [error, setError] = useState();
  const [code, setCode] = useState("");
  let history = useHistory();
  
  const handleSubmit = (e) => {
      e.preventDefault()
    joinProject(code)
        .then((res) => {
          if (res.status === 200) {
            //updateActiveUser(res.data);
            props.setLoggedUser(getActiveUser());
            store.addNotification({
              title: "Success!",
              message: "Joined Project",
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
            history.push(`/projects/${res.data.id}`);
          } else {
            setError(res.data.message);
          }
        })
        .catch((err) => {
          setError(err.response.data);
        });
  };

  const handleChange = (e) => {
    setCode( e.target.value)
  };

  return (
    <form onSubmit={handleSubmit}>
    <div 
      style={{
          fontSize:"50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "75vh",
      }}
    >
      <TextField
        id="standard-helperText"
        label="Enter Invitation code"
        value={code}
        onChange={handleChange}
        helperText={error}
        error={error}
      />
       <Button type="submit">
        Submit
      </Button>
      </div>
    </form>
  );
}
