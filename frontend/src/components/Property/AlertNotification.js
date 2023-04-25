import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from "react-bootstrap";

export default function AlertNotification() {

  return (
  <Alert variant="info">
    You have no messages at this time.
  </Alert>
  );
};