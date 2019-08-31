import React from 'react';

import ShortDay from './ShortDay';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { YearStyles } from '../../styles/CalendarStyles';

export default function Year() {
  const classes = YearStyles();
  const { days } = useSelector((state: State) => state.calendar);
  return (
    <div className={classes.year}>
      {days.map((day, index) => (
        <ShortDay key={index} day={day} />
      ))}
    </div>
  );
}

// import React, { Component } from 'react';

// interface iProps {
//   months: any[];
//   setSelection: Function;
//   setViewType: Function;
// }

// interface iState {}

// export default class Year extends Component<iProps, iState> {
//   constructor(props: iProps) {
//     super(props);
//   }

//   setSelectionMonth = (month: any /* iMonth */) => {
//     this.props.setSelection(month);
//   };

//   setViewTypeMonth = (month: any /* iMonth */) => {
//     this.props.setViewType(2, month);
//   };

//   setSelectionDay = (day: any /* iDay */) => {
//     if (day.mock) return;
//     this.props.setSelection(day);
//   };

//   setViewTypeDay = (day: any /* iDay */) => {
//     if (day.mock) return;
//     this.props.setViewType(0, day);
//   };

//   /* MessageIcon(events: iMREVT_EVENT[]) {
//     if (events.find(item => item.EVENT_TYPE == EventsType.EVENT))
//       return <Icon name='message' className={year.message} />;
//   }

//   GreenDot(events: iMREVT_EVENT[]) {
//     if (events.find(item => item.EVENT_TYPE == EventsType.MEETING))
//       return <div className={`${year.dayItem} ${year.greenDot}`} />;
//   }

//   YellowDot(events: iMREVT_EVENT[]) {
//     if (events.find(item => !!(item.META && ~item.META.indexOf(EventsType.Incoming))))
//       return <div className={`${year.dayItem} ${year.yellowDot}`} />;
//   }

//   RedDot(events: iMREVT_EVENT[]) {
//     if (events.find(item => !!(item.META && ~item.META.indexOf(EventsType.Expired))))
//       return <div className={`${year.dayItem} ${year.redDot}`} />;
//   } */

//   Months(month: any /* iMonth */) {
//     /* let dayClassName = (item: any iDay) =>
//       `${item.mock ? year.mock : year.day} ${item.isSelected ? year.selectedDay : ''} ${
//         item.isToday ? year.today : ''
//       }`; */
//     return month.days.map((day: any, index: number) => (
//       <div
//         onClick={() => this.setSelectionDay(day)}
//         onDoubleClick={() => this.setViewTypeDay(day)}
//         // onClick={() => clickDiffer(this.setSelectionDay, day, false)}
//         // onDoubleClick={() => clickDiffer(this.setViewTypeDay, day, true)}
//         key={index}>
//         {!day.mock && <div /* className={year.date} */>{day.date.getDate()}</div>}
//         {!!day.events.length && (
//           <div /* className={year.dayItems} */>
//             {/* {this.RedDot(day.events)}
//             {this.YellowDot(day.events)}
//             {this.GreenDot(day.events)}
//             {this.MessageIcon(day.events)} */}
//           </div>
//         )}
//       </div>
//     ));
//   }

//   WeekDays() {
//     return ['Пн', 'Пн', 'Пн', 'Пн', 'Пн', 'Пн', 'Пн'].map((item, index) => (
//       <div /* className={year.weekDays} */ key={index}>{item}</div>
//     ));
//   }

//   render() {
//     return (
//       <div /* className={year.year} */>
//         {this.props.months.map(month => (
//           <div key={month.index}>
//             <div
//               /* className={year.monthTitle} */
//               onClick={() => this.setSelectionMonth(month)}
//               onDoubleClick={() => this.setViewTypeMonth(month)}
//               // onClick={() => clickDiffer(this.setSelectionMonth, month, false)}
//               // onDoubleClick={() => clickDiffer(this.setViewTypeMonth, month, true)}
//             >
//               {month.name}
//             </div>
//             {this.WeekDays()}
//             <div /* className={year.monthBody} */>{this.Months(month)}</div>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }
