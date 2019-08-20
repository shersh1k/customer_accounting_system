import React from 'react';
import { Tabs, Tab, Container } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import LoginIn from './LoginIn';
import Register from './Register';

interface iProps {}
interface iState {
  tabValue: number;
}

export default class Login extends React.Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = { tabValue: 0 };
  }

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => this.setState({ tabValue: newValue });

  render() {
    return (
      <Container maxWidth='sm'>
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'>
          <Tab label='Войти' />
          <Tab label='Регистрация' />
        </Tabs>
        <SwipeableViews index={this.state.tabValue}>
          <LoginIn />
          <Register />
        </SwipeableViews>
      </Container>
    );
  }
}
