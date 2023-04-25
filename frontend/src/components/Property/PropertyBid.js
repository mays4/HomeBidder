import { Button } from "react-bootstrap";
import { useState } from "react";
import './PropertyBid.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Timer from "./Timer";


export default function PropertyBid(props) {

  const { state, user_id,userType, userSetBid, endDay , addBidTohistory} = props;
  const [error, setError] = useState("");
  const maxAmount = state.bids.length ? Math.max(...state.bids.map(item => Number(item.amount)), 0) : ((state.properties.base_price_in_cents /100)/100 * 80);


console.log(maxAmount);
  const minBidAmount = maxAmount + state.properties.increment_price_per_bid / 100;

  const [amount, setAmount] = useState(maxAmount || 0);
  const registrationDetails = state.bidders.filter(item => item.user_id === user_id)
  const registrationId = registrationDetails && registrationDetails[0] && registrationDetails[0].id;

  const bidId = state.bids.filter(item => item.amount === maxAmount ? item : "");
  const maxBidAmountBidderId = bidId && bidId[0] && bidId[0].bidder_registration_id;
  const bidder_user = state.bidders.filter(item => item.id ===  maxBidAmountBidderId)
  const bidder_user_id = bidder_user && bidder_user[0] && bidder_user[0].user_id;
  const userDetails = state.users.filter(item => item.id === bidder_user_id ? item : "")


  const submitBid = () => {

    const data = {
      registrationId,
      amount
    }
    if (amount >= minBidAmount) {
      setError("")
      userSetBid(data)
        .then(() => {

        })
        .catch(error => setError(error))
    } else {
      setError(`Min Amount Must be greater than current Bid $${maxAmount} About $${state.properties.increment_price_per_bid / 100}`);
    }
  }


  const endBid = () => {
    const bidOverAmount = maxAmount;
    const BidWonUserId = userDetails && userDetails[0] && userDetails[0].id;
    const property_owner_id = state.properties.owner_id;
    const property_id = state.properties.id;
    if (userType !== 1 && property_owner_id !== user_id) {
      addBidTohistory(bidOverAmount, BidWonUserId, property_owner_id, property_id)
        .then(result => console.log(result))
        .catch(error => console.log(error));
    }
  }


  return (
    <>
      <table className="table_bids">
        <thead>
          <tr>
            <th width="30%">
              <span> {state.bidders.length} Bidders</span>
            </th>
            <th width="30%">
            {(userType !== 1 && state.properties.owner_id !== user_id) ? (
              <>
              <input type="number" min={minBidAmount}
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required className="amount_input"></input>
              <section style={{ color: "red" }}>{error}</section>
              </>
            ) : <tr className="amount_digit">
            { (userDetails && userDetails[0]) ? userDetails[0].first_name + " " + userDetails[0].last_name+":" : "Current Amount :"}  {maxAmount}</tr>}
            </th>
            <th width="30%">
              {(userType !== 1 && state.properties.owner_id !== user_id) &&
                <Button size="lg" onClick={submitBid}>Submit</Button>
              }
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
        {(userType !== 1 && state.properties.owner_id !== user_id) &&
          <td className="amount_digit">
            { (userDetails && userDetails[0]) ?
            ((userDetails[0].id === user_id) ? "Your Bid :" : userDetails[0].first_name + " " + userDetails[0].last_name+":") : "Current Amount: $"}  {maxAmount}</td>
        }
        </tr>
        </tbody>
      </table>
      <br />
      <Timer endBid= {endBid} endDay={endDay} />
      <hr />
    </>
  );
}