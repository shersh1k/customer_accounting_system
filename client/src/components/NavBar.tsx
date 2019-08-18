import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { ListItemText, ListItemIcon } from '@material-ui/core';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Autorenew from '@material-ui/icons/Autorenew';
import Info from '@material-ui/icons/Info';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import CalendarToday from '@material-ui/icons/CalendarToday';
import TableChart from '@material-ui/icons/TableChart';
import ShowChart from '@material-ui/icons/ShowChart';
import { logout } from '../store/user/actions';
import { store } from '../store';
import { Generate } from './../helpers/API/Methods';

interface iProps {
  className: string;
}

export default function NavBar(props: iProps) {
  return (
    <Drawer className={props.className} variant='permanent' anchor='left'>
      <List component='nav'>
        <ListItem component={Link} to='/orders/neworder' button>
          <ListItemIcon>
            <LibraryAdd />
          </ListItemIcon>
          <ListItemText primary='Новый заказ' />
        </ListItem>
        <ListItem divider />
        <ListItem component={Link} to='/' button>
          <ListItemIcon>
            <FormatListBulleted />
          </ListItemIcon>
          <ListItemText primary='Главная' />
        </ListItem>
        <ListItem component={Link} to='/calendar' button>
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText primary='Календарь' />
        </ListItem>
        <ListItem component={Link} to='/stats' button>
          <ListItemIcon>
            <ShowChart />
          </ListItemIcon>
          <ListItemText primary='Статистика' />
        </ListItem>
        <ListItem component={Link} to='/archive' button>
          <ListItemIcon>
            <TableChart />
          </ListItemIcon>
          <ListItemText primary='Архив' />
        </ListItem>
        <ListItem divider />
        <ListItem button onClick={() => store.dispatch(logout())}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary='Выйти' />
        </ListItem>
        <ListItem divider />
        <ListItem button onClick={() => Generate()}>
          <ListItemIcon>
            <Autorenew />
          </ListItemIcon>
          <ListItemText primary='Generate' />
        </ListItem>
        <ListItem component={Link} to='/readme' button>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary='ReadMe' />
        </ListItem>
      </List>
    </Drawer>
  );
}
