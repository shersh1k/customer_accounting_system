import React from 'react';
import { iNote } from '../../store/order/types';
import { ListItem } from '@material-ui/core';

interface iProps extends iNote {
  isEdit: boolean;
}

export function Note(props: iProps) {
  const { _id, title, body, createdAt, isEdit } = props;
  return (
    <ListItem>
      <span>{createdAt && createdAt.toLocaleDateString()} </span>
      <hr />
      <span>{title} </span>
      <hr />
      <span>{body} </span>
    </ListItem>
  );
}
