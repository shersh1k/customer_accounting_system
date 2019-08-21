import React from 'react';
import { iOrder } from '../../store/order/types';
import { Tabs } from '../../store/orderLists/types';
import { CircularProgress } from '@material-ui/core';
import { OrderCard } from './OrderCard/index';

interface iProps {
  isPending: boolean;
  list: iOrder[];
  showedTab: Tabs | 'LastTen';
}

export function List(props: iProps) {
  const { list, showedTab } = props;
  return (
    <div style={{ overflow: 'auto' }}>
      {props.isPending && <CircularProgress style={{ margin: 10 }} size={30} />}
      {list.map((order, index) => (
        <OrderCard key={index} order={order} showedTab={showedTab} />
      ))}
    </div>
  );
}
