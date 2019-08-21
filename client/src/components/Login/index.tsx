import React, { useState } from 'react';
import { Tabs, Tab, Container } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import LoginIn from './LoginIn';
import Register from './Register';

export default function Login() {
  const [tabValue, setTab] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setTab(newValue);

  return (
    <Container maxWidth='sm'>
      <Tabs value={tabValue} onChange={handleChange} indicatorColor='primary' textColor='primary' variant='fullWidth'>
        <Tab label='Войти' />
        <Tab label='Регистрация' />
      </Tabs>
      <SwipeableViews index={tabValue}>
        <LoginIn />
        <Register />
      </SwipeableViews>
    </Container>
  );
}
