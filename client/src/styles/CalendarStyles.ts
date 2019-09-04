import { makeStyles, Theme, createStyles } from '@material-ui/core';

const RootStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexFlow: 'column'
    }
  })
);
const ShortDayStyles = makeStyles((theme: Theme) =>
  createStyles({
    day: {
      overflow: 'hidden',
      width: '14.28%',
      border: '1px solid black',
      boxSizing: 'border-box'
    }
  })
);
const DayStyles = makeStyles((theme: Theme) =>
  createStyles({
    day: {
      display: 'flex',
      flexFlow: 'column wrap',
      margin: 5,
      padding: 5,
      height: '100%'
    },
    order: {
      margin: 5
    },
    content: {
      display: 'flex',
      flexFlow: 'column'
    }
  })
);
const WeekStyles = makeStyles((theme: Theme) =>
  createStyles({
    week: {
      display: 'flex',
      height: '100%'
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
      margin: 10,
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
    },
    choosedDates: {
      order: 4,
      margin: theme.spacing(1),
      minWidth: '50%'
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: { margin: 2 }
  })
);

export { RootStyles, ShortDayStyles, DayStyles, WeekStyles, MonthStyles, YearStyles, PanelStyles };
