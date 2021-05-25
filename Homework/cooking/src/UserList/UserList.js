import React, { useState } from "react";
import { getAllUser } from "../services/userService";
import { CssBaseline} from "@material-ui/core";
import List from "@material-ui/core/List";
import UserListItem from '../helperComponents/usersListItems'
export default function UserList() {
  let Allusers = getAllUser(); 
  const [users] = useState(Allusers)
  return (
    <div>
      <CssBaseline />
      <List>
        {users.map((user) => (
          <UserListItem user={user}></UserListItem>
        ))}
      </List>
    </div>
  );
}
