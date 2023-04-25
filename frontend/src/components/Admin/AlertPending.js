import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from "react-bootstrap";

export default function AlertPending() {

  return (
  <Alert variant="info">
    There are no pending listings at this time.
  </Alert>
  );
};