import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import PendingListItem from "./PendingListItem";
import AlertPending from "./AlertPending";
import { Container } from 'react-bootstrap';
import { useContext } from 'react';
import { propertyContext } from '../../providers/PropertyProvider';


export default function PendingList() {

  const {state} = useContext(propertyContext);
  
  const pending = state.properties && state.properties.filter(item => item.is_approved === false && item);


  const pendingList = pending.map((item, index) => {
    return <PendingListItem
      key={index}
      properties={item}
      users={state.users}
    />
  });

  console.log("pending ==> ", pending)

  return (
    <>
    <Container className="col-lg-10">
      <h4><hr/>Admin &raquo; Pending Listings for Approval</h4>
      <hr/>
      {pendingList.length === 0 && <AlertPending />}
      {pendingList}
    </Container>
    </>
  );
};
