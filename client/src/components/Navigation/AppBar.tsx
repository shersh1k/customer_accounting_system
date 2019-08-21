import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { AppBarStyles } from '../../styles/AppBarStyles';
import { State } from '../../store';
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';

interface iProps {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function PrimarySearchAppBar(props: iProps) {
  const { toggleDrawer } = props;
  const classes = AppBarStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const pathname = useSelector((state: State) => state.router.location.pathname);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Hidden lgUp>
            <IconButton
              onClick={toggleDrawer(true)}
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography className={classes.title} variant='h6'>
            {pathname}
          </Typography>
          <div className={classes.grow} />
          <IconButton edge='end' onClick={handleProfileMenuOpen} color='inherit'>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ProfileMenu {...{ anchorEl, isMenuOpen, handleMenuClose }} />
    </div>
  );
}
