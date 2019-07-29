import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { ListItemText, ListItemIcon } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';

interface iProps {
  className: string;
}

export default function NavBar(props: iProps) {
  return (
    <Drawer className={props.className} variant="permanent" anchor="left">
      <List component="nav">
        <ListItem component={Link} to="/" button>
          <ListItemIcon><InboxIcon shapeRendering="asd" /></ListItemIcon>
          <ListItemText primary="Домой" />
        </ListItem>
        <ListItem component={Link} to="/hello" button>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="Привет" />
        </ListItem>
        <ListItem component={Link} to="/counter" button>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="Счетчик" />
        </ListItem>
      </List>
    </Drawer >
  );
}