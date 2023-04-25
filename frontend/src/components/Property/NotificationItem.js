import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import { ListGroup, Badge } from 'react-bootstrap';

export default function NotificationItem(props) {
  const { message, readStatus, notificationId } = props;

  const confirmRead = (e) => {
    const data = {
      messageId: notificationId
    }
    e.preventDefault()
    axios.patch('/api/users/notifications/', {data})
    .then((response) => {
      window.location = "/users/notifications"
      console.log(response);
    })
    .catch((error) => console.log(error));
  }

  return (
    <>
      {(readStatus === false) &&
        <ListGroup.Item
          action
          variant="primary"
          className="d-flex justify-content-between align-items-start"
          >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{message}</div>
          </div>
          <Badge variant="primary" pill onClick={confirmRead}>
            Mark As Read
          </Badge>
        </ListGroup.Item>
      }

      {(readStatus === true) &&
        <ListGroup.Item>
          <div className="ms-2 me-auto">
            <div>{message}</div>
          </div>
        </ListGroup.Item>
      }
    </>
  );
};