import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Hidden } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from './AppBar';
import SideMenu from './SideMenu';
import { PermanentDrawerStyles } from '../../styles/AppBarStyles';

interface iProps {}

export default function Navigation(props: iProps) {
  const [state, setState] = React.useState(false);
  const classes = PermanentDrawerStyles();
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    setState(open);
  };

  return (
    <>
      <AppBar toggleDrawer={toggleDrawer} />
      <Hidden mdDown>
        <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} variant='permanent' anchor='left'>
          <SideMenu />
        </Drawer>
      </Hidden>
      <Hidden lgUp>
        <SwipeableDrawer open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
          <SideMenu toggleDrawer={toggleDrawer(false)} />
        </SwipeableDrawer>
      </Hidden>
    </>
  );
}
