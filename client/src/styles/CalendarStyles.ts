import { makeStyles, Theme, createStyles } from '@material-ui/core';

const RootStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    }
  })
);
const ShortDayStyles = makeStyles((theme: Theme) =>
  createStyles({
    day: {
      overflow: 'hidden',
      width: '14.28%',
      minHeight: 30,
      maxHeight: 30,
      border: '1px solid black',
      boxSizing: 'border-box'
    }
  })
);
const DayStyles = makeStyles((theme: Theme) =>
  createStyles({
    day: {
      display: 'flex',
      flexFlow: 'column wrap'
    }
  })
);
const WeekStyles = makeStyles((theme: Theme) =>
  createStyles({
    week: {
      display: 'flex'
    }
  })
);
const MonthStyles = makeStyles((theme: Theme) =>
  createStyles({
    month: {
      display: 'flex',
      flexFlow: 'row wrap'
    }
  })
);
const YearStyles = makeStyles((theme: Theme) =>
  createStyles({
    year: {
      display: 'flex',
      flexFlow: 'row wrap'
    }
  })
);
const PanelStyles = makeStyles((theme: Theme) =>
  createStyles({
    panel: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-around'
    },
    viewChanger: {
      order: 3,
      [theme.breakpoints.down('sm')]: {
        order: 1
      }
    },
    direction: {
      order: 2,
      minWidth: '310px',
      textAlign: 'center'
    },
    today: {
      order: 1,
      [theme.breakpoints.down('sm')]: {
        order: 0
      }
    }
  })
);

export { RootStyles, ShortDayStyles, DayStyles, WeekStyles, MonthStyles, YearStyles, PanelStyles };
