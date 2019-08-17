import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from '../../../store/orderLists/types';
import { iOrder } from '../../../store/order/types';
import { Queuing } from './Queuing';

interface iProps {
  order: iOrder;
  showedTab: Tabs | 'LastTen';
  handleDateChange?: Function;
}

export function Title(props: iProps) {
  const { order, showedTab, handleDateChange } = props;
  const { dateOrder, dateDeadline, dateStartWork, slug, title } = order;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to={`/orders/${slug}`}>{title}</Link>
      {showedTab === 'DateDeadline' && !dateStartWork && (
        <Queuing maxDate={dateDeadline} handleDateChange={handleDateChange} />
      )}
      {showedTab === 'DateDeadline' && (
        <div style={{ color: 'red', fontSize: 20 }}>Осталось {calcRange(new Date(), dateDeadline)} дней</div>
      )}
      {showedTab === 'DateStartWork' && (
        <div style={{ color: 'green', fontSize: 20 }}>В плане через {calcRange(new Date(), dateStartWork)} дней</div>
      )}
      {showedTab === 'NotPayed' && (
        <div style={{ color: 'blue', fontSize: 20 }}>Ожидание {calcRange(dateDeadline, new Date())} дней</div>
      )}
    </div>
  );
}

const calcRange = (fromDate?: Date, toDate?: Date) => {
  if (!fromDate || !toDate) return;
  toDate = new Date(toDate);
  fromDate = new Date(fromDate);
  const dif = fromDate.getTime() - toDate.getTime();
  return Math.abs(Math.floor(dif / (1000 * 60 * 60 * 24)));
};
