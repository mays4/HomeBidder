import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Property.css";
import "font-awesome/css/font-awesome.min.css";


export default function PropertyDetails(props) {

  const {state, formatter} = props;
  const dateFormater = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", { timeZone: "America/New_York" });
  };


  return (
    <div>
      <div className="div-orginize">
        <div className="col-md-6">
          <section className="details">
            <h2>Property Details</h2>
            <span> Number of Parking Spots: <b>{state.properties.parking_spaces}</b></span>
            <span> Property Type: <b>{state.properties.property_type}</b></span>

            <span>Area: <b>{state.properties.square_footage}</b> Sq Ft</span>

            <span>Year Built: <b>{state.properties.year_built}</b></span>
          </section>
        </div>
        <div className="col-sm-6">
          <div className="bidding-div">
            <div className="bid-info">
              <span className="bidding">
                <span className="p-2 mb-2  text-light">
                  Market Price : {formatter.format(
                          state.properties.base_price_in_cents / 100
                        )} CAD
                </span>
              </span>
              <span className="p-3 mb-3 text-black">
                <h6>Bid Starting Date:</h6>
                {dateFormater(state.properties.bid_start_date)}
              </span>
              <span className="p-3 mb-3  text-black">
                <h6>Bid Ending Date:</h6>
                {dateFormater(state.properties.bid_end_date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12">
      <hr></hr>
      </div>

    </div>
  );
}
