import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { FormatListBulleted, Info, LibraryAdd, CalendarToday, TableChart, ShowChart } from '@material-ui/icons';
import { Generator } from '../Generator';

interface iProps {
  toggleDrawer?: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function SideMenu(props: iProps) {
  return (
    <List component='nav' onClick={props.toggleDrawer}>
      <ListItem component={Link} to='/neworder' button>
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
      <Generator />
      <ListItem component={Link} to='/readme' button>
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <ListItemText primary='ReadMe' />
      </ListItem>
    </List>
  );
}
