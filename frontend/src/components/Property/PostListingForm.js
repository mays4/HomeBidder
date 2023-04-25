import React, { useState } from "react";
import axios from "axios";
import { Form, Row, Col, Button, Container, Modal } from "react-bootstrap";
import { useEffect } from "react/cjs/react.development";

export default function PostListingForm() {
  // Setting the initial minimum bid start date
  const minStart = new Date();
  minStart.setDate(minStart.getDate() + 3);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postCode, setPostCode] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numBeds, setNumBeds] = useState("");
  const [numBaths, setNumBaths] = useState("");
  const [numParking, setNumParking] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [bidStartDate, setBidStartDate] = useState(
    minStart.toISOString().slice(0, 10)
  );
  const [bidEndDate, setBidEndDate] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [imageUrl, setImageUrl] = useState([]);

  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [imageCheck, setImageCheck] = useState(false);

  // Temporarily getting the userid from localStorage until backend finalized
  const userid = localStorage.getItem("userid");

  // Setting the minimum bid end date
  const minEnd = new Date(bidStartDate);
  minEnd.setDate(minEnd.getDate() + 5);

  // Setting the maximmum bid end date
  const maxEnd = new Date(bidStartDate);
  maxEnd.setDate(maxEnd.getDate() + 7);
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "homebidder");
    data.append("cloud_name", "dj8arn33b");
    axios
      .post("https://api.cloudinary.com/v1_1/dj8arn33b/image/upload", data)
      .then((response) => {
        setImageCheck(true);
        

        setUrl(response.data.url);
      });
  };

  const newListing = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (imageCheck) {
      axios
        .post("/api/properties/new", {
          street: street,
          city: city,
          province: province,
          post_code: postCode,
          property_type: propertyType,
          number_of_bedrooms: numBeds,
          number_of_bathrooms: numBaths,
          parking_spaces: numParking,
          square_footage: squareFootage,
          year_built: yearBuilt,
          owner_id: userid,
          bid_start_date: bidStartDate,
          bid_end_date: bidEndDate,
          base_price_in_cents: basePrice,
          image_url: url,
        })
        .then((response) => {
          
           window.location = "/properties/mylistings";
        });
    }
  };

  return (
    <Modal.Dialog size="lg">
      <Modal.Header>
        <Modal.Title className="m-auto">Create a New Listing</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <br></br>
          <Form onSubmit={newListing}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridStreet">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="street"
                  placeholder="Street Address"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="city"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridProvince">
                <Form.Label>Province</Form.Label>
                <Form.Control
                  as="select"
                  type="province"
                  required
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  <option>Please select...</option>
                  <option>Alberta</option>
                  <option>British Columbia</option>
                  <option>Manitoba</option>
                  <option>New Brunswick</option>
                  <option>Newfoundland and Labrador</option>
                  <option>Northwest Territories</option>
                  <option>Nova Scotia</option>
                  <option>Nunavut</option>
                  <option>Ontario</option>
                  <option>Prince Edward Island</option>
                  <option>Quebec</option>
                  <option>Saskatchewan</option>
                  <option>Yukon</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPostal">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="postCode"
                  placeholder="Postal Code"
                  required
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPropertyType">
                <Form.Label>Property Type</Form.Label>
                <Form.Control
                  as="select"
                  type="propertyType"
                  value={propertyType}
                  required
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option>Please select...</option>
                  <option>Detached</option>
                  <option>Semi-Detached</option>
                  <option>Row/Townhouse</option>
                  <option>Condo Apartment</option>
                  <option>Duplex</option>
                  <option>Triplex</option>
                  <option>Fourplex</option>
                  <option>Mobile Home</option>
                  <option>Floathome</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridBedrooms">
                <Form.Label>Bedrooms</Form.Label>
                <Form.Control
                  as="select"
                  type="numBeds"
                  value={numBeds}
                  required
                  onChange={(e) => setNumBeds(e.target.value)}
                >
                  <option>Please select...</option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridBathrooms">
                <Form.Label>Bathrooms</Form.Label>
                <Form.Control
                  as="select"
                  type="numBaths"
                  required
                  value={numBaths}
                  onChange={(e) => setNumBaths(e.target.value)}
                >
                  <option>Please select...</option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridParking">
                <Form.Label>Parking Spaces</Form.Label>
                <Form.Control
                  as="select"
                  type="numParking"
                  required
                  value={numParking}
                  onChange={(e) => setNumParking(e.target.value)}
                >
                  <option>Please select...</option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFootage">
                <Form.Label>Square Footage</Form.Label>
                <Form.Control
                  type="squareFootage"
                  placeholder="Square Footage"
                  required
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridYearBuilt">
                <Form.Label>Year Built</Form.Label>
                <Form.Control
                  type="yearBuilt"
                  placeholder="Year Built"
                  required
                  value={yearBuilt}
                  onChange={(e) => setYearBuilt(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridBidStart">
                <Form.Label>Bid Start Date</Form.Label>
                <Form.Control
                  type="date"
                  min={minStart.toISOString().slice(0, 10)}
                  placeholder="YYYY-MM-DD"
                  required
                  value={bidStartDate}
                  onChange={(e) => setBidStartDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridBidEnd">
                <Form.Label>Bid End Date</Form.Label>
                <Form.Control
                  type="date"
                  min={minEnd.toISOString().slice(0, 10)}
                  max={maxEnd.toISOString().slice(0, 10)}
                  placeholder="YYYY-MM-DD"
                  required
                  value={bidEndDate}
                  onChange={(e) => setBidEndDate(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group
              as={Col}
              controlId="formGridBidBasePrice"
              className="mb-3"
            >
              <Form.Label>Bid Base Price</Form.Label>
              <Form.Control
                type="bidBasePrice"
                placeholder="$"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Upload property images</Form.Label>

              <Form.Control
                name="images"
                type="file"
                // multiple
                // For each image uploaded, I need to append to imageUrl using spread operator
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button onClick={uploadImage}>Upload</button>
              <></>
            </Form.Group>

            <Button className="me-4" variant="secondary">
              Cancel
            </Button>

            <Button variant="primary" className="btn btn-dark" type="submit">
              Submit Listing
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal.Dialog>
  );
}
