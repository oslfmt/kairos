import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

/**
 * This component renders a list of items using react-bootstrap UI
 * @props items - an array of items to render in a list
 */
export default function ItemList(props) {
  const items = props.items;
  const itemsList = items.map((listItem, index) => (
    <ListGroup.Item key={index}>{listItem}</ListGroup.Item>
  ));

  return <ListGroup>{itemsList}</ListGroup>;
}
