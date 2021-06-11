import React, { useState,useEffect } from "react";
import { getAllUsers } from "../../services/userService";
import { CssBaseline } from "@material-ui/core";
import List from "@material-ui/core/List";
import UserListItem from "./UsersListItems";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllUsers();
      setUsers(response);
    };
    fetchData();
  }, []);
  const usersList = (
    <List>
      {users.map((user) => (
        <UserListItem key={user._id} user={user}></UserListItem>
      ))}
    </List>
  );
  return (
    <div>
      <CssBaseline />
      <div>
        {usersList}
      </div>
    </div>
  );
}
