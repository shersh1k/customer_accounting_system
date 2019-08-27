import { makeStyles, Theme, createStyles } from '@material-ui/core';

const AppBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      [theme.breakpoints.down('lg')]: {
        width: '100%'
      }
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    }
  })
);

const AppStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: 'flex',
      [theme.breakpoints.down('lg')]: {
        width: '100%',
        overflowX: 'auto',
        minHeight: 'calc(100vh - 64px)'
      }
    },
    mainWrapper: {
      [theme.breakpoints.up('lg')]: {
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'scroll'
      }
    },
    menuDesktop: {
      [theme.breakpoints.up('lg')]: {
        minWidth: '200px'
      }
    }
  })
);

export { AppBarStyles, AppStyles };
