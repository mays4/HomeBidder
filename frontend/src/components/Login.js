import "./Login.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { propertyContext } from "../providers/PropertyProvider";
import { toast } from "react-toastify";

export default function Login(props) {
  const { setLoggedInUser } = useContext(propertyContext);

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/login", {
        email: userEmail,
        password: password,
      })
      .then((response) => {

        if (!response.data.auth) {
          if (password === "") {
            toast("please enter password");
            return;
          } else {
            toast("Sorrrrrry !!!! Un-authenticated User !!!!!");
          }
        } else {
          props.toggleLoginModal();
          setLoggedInUser(response.data.user);
          localStorage.setItem('token', response.data.token);
        }
      });
  };

  function validate() {
    if (userEmail === "") {
      toast("email cannot be blank");
      return;
    }
  }



  return (
    <div className="login">
      <Modal
        show={props.show}
        onHide={props.toggleLoginModal}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log in to continue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="loginform" onSubmit={login}>
            <div className="form-group ">
              <label>Email </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="button-login">
              <div className="form-group">
                <Button
                  className="login-button"
                  onClick={props.toggleLoginModal}
                >
                  Cancel
                </Button>
              </div>
              <div className="form-group">
                <Button
                  type="submit"
                  className="login-button"
                  onClick={validate}
                >
                  Login
                </Button>
              </div>
            </div>


          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
