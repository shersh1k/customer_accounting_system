import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import { ListItemText, ListItemIcon } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { logout } from "../store/user/actions";
import { store } from "../store";
import { Generate } from './../helpers/API/Methods';


interface iProps {
  className: string;
  generate?: boolean;
}

export default function NavBar(props: iProps) {
  return (
    <Drawer className={props.className} variant="permanent" anchor="left">
      <List component="nav">
        <ListItem component={Link} to="/orders/neworder" button >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Новый заказ" />
        </ListItem>
        <ListItem divider />
        <ListItem component={Link} to="/" button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Главная" />
        </ListItem>
        <ListItem component={Link} to="/archive" button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Архив" />
        </ListItem>
        <ListItem button onClick={() => store.dispatch(logout())}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Выйти" />
        </ListItem>
        {props.generate && <ListItem button onClick={() => Generate()}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Сгенерировать базу" />
        </ListItem>}
      </List>
    </Drawer>
  );
}
