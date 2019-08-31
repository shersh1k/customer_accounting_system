import React, { useEffect } from 'react';
import { CardHeader, CardActions } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store';
import { getOrder } from '../../store/order/actions';
import Title from './Title';
import Content from './Content';

export default function Order() {
  const dispatch = useDispatch();
  const slug = useSelector((state: State) => state.router.location.pathname.split('/')[2]);
  useEffect(() => {
    dispatch(getOrder(slug));
  }, [dispatch, slug]);

  return (
    <div style={{ flex: 1 }}>
      <CardHeader title={<Title />} />
      <Content />
      <CardActions />
    </div>
  );
}
