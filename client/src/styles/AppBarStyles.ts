import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

const AppBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      [theme.breakpoints.down('lg')]: {
        width: '100%'
      },
      [theme.breakpoints.up('lg')]: {
        width: 'calc(100% - 250px)',
        marginLeft: 250
      }
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto'
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200
      }
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    }
  })
);

const PermanentDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      width: `calc(100% - 250px)`,
      marginLeft: 250
    },
    drawer: {
      width: 250,
      flexShrink: 0
    },
    drawerPaper: {
      width: 250,
      marginTop: 64
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      [theme.breakpoints.down('lg')]: {
        width: '100%'
      },
      [theme.breakpoints.up('lg')]: {
        width: 'calc(100% - 250px)',
        marginLeft: 250,
        maxHeight: 'calc(100vh - 64px)',
        overflow: 'auto'
      }
    }
  })
);

export { AppBarStyles, PermanentDrawerStyles };
