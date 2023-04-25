import { Link } from "react-router-dom";
import "./PropertyListItem.css";
import "font-awesome/css/font-awesome.min.css";
import { Carousel, Col, Badge, Button} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PropertListItem(props) {
  const { properties, fav, addToFav, removeFav, user, myList } = props;
  const imgUrl =
    properties.thumbnail &&
    properties.thumbnail.map((item, index) => {
      return (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100"
          src={item.image_url}
          alt={item.image_url}
        />
      </Carousel.Item>
      )
    });
console.log(properties);
  const pathname = (myList && properties.is_approved === false) ? "" :  `/listing/${properties.id}`;
  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const save = () => {
    addToFav(user.id, properties.id)
      .then(toast.success("Property added to Fav"))
      .catch((error) => console.log(error));
  };

  const remove = () => {
    removeFav(user.id, properties.id)
      .then(toast.success("Property Removed From Fav"))
      .catch((error) => console.log(error));
  };

  const today = new Date();
  const startDay = new Date(properties.bid_start_date);
  const endDay = new Date(properties.bid_end_date);
  const diffStart = startDay.getTime() - today.getTime();
  const diffEnd = endDay.getTime() - today.getTime();

  return (
    <Col sm>
      <div className="box">
        <div className="top">
          <Carousel interval={null}>
            {imgUrl}

          </Carousel>
          {(user.id && user.user_type !== 1 && properties.is_approved)&&
            (fav && fav.includes(properties.id) ? (
              <div className="fav" onClick={remove}>
                <i className="fa fa-star" style={{ color: "red" }}></i>
              </div>
            ) : (
              <div className="fav" onClick={save}>
                <i className="fa fa-star" style={{ color: "white" }}></i>
              </div>
            ))}

            {(myList && properties.is_approved === false) && (
              <Badge bg="danger" className="approved_status">Not Yet Approved</Badge>
            )}
        </div>
        <Link
          className="link_to_details"
          to={{
            pathname: pathname,
            key: properties.id,
          }}
        >
          <div className="bottom">
            <h3>{properties.street}</h3>
            <p>
              Enchanting {properties.number_of_bedrooms} bedroom,{" "}
              {properties.number_of_bathrooms} bathroom home
            </p>
            <div className="advants">
              <div>
                <span>Bedrooms</span>
                <div>
                  <i className="fa fa-th-large"></i>
                  <span>{properties.number_of_bedrooms}</span>
                </div>
              </div>
              <div>
                <span>Bathrooms</span>
                <div>
                  <i className="fa fa-shower"></i>
                  <span>{properties.number_of_bathrooms}</span>
                </div>
              </div>
              <div>
                <span>Area</span>
                <div>
                  <i className="fa fa-square"></i>
                  <span>
                    {properties.square_footage}
                    <span>Sq Ft</span>
                  </span>
                </div>
              </div>
            </div>
              <div className="price">
              {(properties.bid_active === false && properties.bid_amount && properties.seller_response === "Accepted") ?
                <span>Sold </span> :
                <span>For Sale</span>
                }
                {((properties.bid_active === false && properties.bid_amount && properties.seller_response === "Accepted") ?
                  <>
                  <strike>{formatter.format(properties.base_price_in_cents / 100)}</strike>
                  {" "}
                  <b style={{color:"green"}}>{formatter.format(properties.bid_amount)}</b>
                  </>
                  :
                  <span>
                  {formatter.format(properties.base_price_in_cents / 100)}
                  </span>
                )}

              </div>
            <div className="bid_status">

                <Badge pill bg="warning">
                {((diffStart <= 0 ) && diffEnd > 0) ?
                  "Bid Started"
                :
                (((diffStart > 0 ) && diffEnd > 0) ?
                  "Bid Not Yet Started" :
                  (((properties.bid_active === true && properties.bid_amount && properties.seller_response === "Pending") || ((diffStart <= 0 ) && diffEnd <= 0)) && "Bid Closed"))
              }
                  </Badge>
            </div>
            <div>
            { (myList && properties.bid_amount && properties.bid_active)&& (
              <>
              <div>
            <Badge pill bg="success">There is an offer for your property </Badge>
            <Badge pill bg="primary">{properties.bid_amount}</Badge>
            </div>
            <br/>
            </>)}
            </div>
          </div>
        </Link>
      </div>
    </Col>
  );
}
