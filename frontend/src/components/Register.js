import React, { useState, useContext } from "react";
import axios from "axios";
import "./Register.css";
import { Button, Modal } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { propertyContext } from "../providers/PropertyProvider";
import { toast } from "react-toastify";


export default function Register(props) {
  const { setLoggedInUser } = useContext(propertyContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmailReg, setUseEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");



  const register = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/register", {
        first_name: firstName,
        last_name: lastName,
        email: userEmailReg,
        password: passwordReg,
      })
      .then((response) => {
        props.toggleRegisterModal();



        // setLoggedInUser(response.data);

        toast(
          <Alert variant="dark">
            you are register now
            <Alert.Link as={Link} to="/login">
              {" "}
              please login
            </Alert.Link>
          </Alert>
        );
      });
  };

  function validate() {
    if (!firstName === "") {
      toast("first name  cannot be blank");
      return;
    }
    if (lastName === "") {
      toast("Last  name  cannot be blank");
      return;
    }
    if (userEmailReg === "") {
      toast("email cannot be blank");
      return;
    }
    if (passwordReg === "") {
      toast("password  cannot be empty");
      return;
    }

  }

  return (
    <Modal
      show={props.show}
      onHide={props.toggleRegisterModal}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Don't have an account? Please register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="registerform" onSubmit={register}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="firstName"
              name="firstName"
              required
              className="form-control"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="LastName"
              className="form-control"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <div className="form-group ">
            <label>Email </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              required
              placeholder="Enter email"
              value={userEmailReg}
              onChange={(e) => {
                setUseEmailReg(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />
          </div>
          <div className="button-register">
            <div className="form-group">
              <Button
                className="register-button"
                onClick={props.toggleRegisterModal}
              >
                Cancel
              </Button>
            </div>
            <div className="form-group">
              <Button
                type="submit"
                className="register-button"
                onClick={validate}
                disabled={passwordReg.length < 8}
              >
                Register
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
