import React from 'react';
import { Menu, MenuItem, Typography, ListItemIcon } from '@material-ui/core';
import { store } from '../../store';
import { logout } from '../../store/user/actions';
import { ExitToApp, Settings, Person } from '@material-ui/icons';

interface iProps {
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
}

export default function ProfileMenu(props: iProps) {
  const { anchorEl, isMenuOpen, handleMenuClose } = props;
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        Профиль
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        Настройки
      </MenuItem>
      <MenuItem onClick={() => store.dispatch(logout())}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        Выйти
      </MenuItem>
    </Menu>
  );
}
