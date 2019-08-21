import React from 'react';
import { Hidden } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from './AppBar';
import SideMenu from './SideMenu';

interface iProps {}

export default function Navigation(props: iProps) {
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    setState(open);
  };

  return (
    <>
      <AppBar toggleDrawer={toggleDrawer} />
      <Hidden lgUp>
        <SwipeableDrawer open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
          <SideMenu toggleDrawer={toggleDrawer(false)} />
        </SwipeableDrawer>
      </Hidden>
    </>
  );
}
