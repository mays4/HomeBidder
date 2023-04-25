import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import { Container, ListGroup } from 'react-bootstrap';
import NotificationItem from "./NotificationItem";
import AlertNotification from "./AlertNotification";
import { useContext } from 'react';
import { propertyContext } from '../../providers/PropertyProvider';

export default function Notification() {

  const {state} = useContext(propertyContext);

  const user_id = state.loggedUser && state.loggedUser.id;

  const notifications = state.notification && state.notification.filter(item => item.user_id === user_id ? item :"")
  

  const notificationList = notifications.map(item => {
    return <NotificationItem
      key={item.id}
      notificationId={item.id}
      message={item.message}
      readStatus={item.has_read}
    />
  })

  return (
    <>
      <Container className="col-lg-10">
        <h5><hr/>My Notifications</h5>
        {notifications.length === 0 && <AlertNotification />}
        <ListGroup as="ul">
          {notificationList}
        </ListGroup>
      </Container>
    </>
  )

}