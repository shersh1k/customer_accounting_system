import React, { Component } from 'react';
import ShortDay from './ShortDay';

interface iProps {
  days: any /* iDay */[];
  setSelection: Function;
  setViewType: Function;
}

interface iState {
  selectedIndex?: number;
}

export default class Week extends Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = { selectedIndex: undefined };
  }

  setDay = () => {
    this.props.setViewType(0);
  };

  componentDidUpdate(prevProps: iProps, prevState: iState) {
    if (prevProps.days !== this.props.days) {
      let selectedIndex: number | undefined = this.props.days.findIndex(item => item.isSelected);
      if (!~selectedIndex) selectedIndex = undefined;
      this.setState({ selectedIndex: selectedIndex });
    }
  }

  setSelection(day: any /* iDay */ | number) {
    if (typeof day == 'number') day = this.props.days[day];
    let index = this.props.days.findIndex(d => d == day);
    this.setState({ selectedIndex: index });
    this.props.setSelection(day);
  }

  WeekDays() {
    return (
      <div>
        {['Понед', 'Понед', 'Понед', 'Понед', 'Понед', 'Понед', 'Понед'].map((item, index) => {
          return (
            <div onClick={() => this.setSelection(index)} onDoubleClick={() => this.setDay()} key={index}>
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div /* className={week.week} */>
        {this.WeekDays()}
        <div /* className={week.wrapScroll} */>
          <div /* className={week.wrapDays} */>
            {/* {this.props.days.map((day, index) => (
              <ShortDay />
            ))} */}
          </div>
        </div>
      </div>
    );
  }
}
