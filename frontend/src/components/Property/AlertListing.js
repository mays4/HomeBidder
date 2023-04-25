import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from "react-bootstrap";

export default function AlertListing() {

  return (
  <Alert variant="info">
    You have no property listings posted at this time.
  </Alert>
  );
};
