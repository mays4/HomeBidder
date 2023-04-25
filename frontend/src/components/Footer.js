import "./Footer.css";
import { Card, Button } from "react-bootstrap";

export default function Footer() {
  return (
    <>
    <footer className="footer-distributed">
      <div className="footer-right">
        <a><i className="fa fa-facebook"></i></a>
        <a><i className="fa fa-twitter"></i></a>
        <a><i className="fa fa-linkedin"></i></a>
      </div>
      <div className="footer-left">
        <p className="footer-links">
          <a className="link-1">Home</a>
          <a>About</a>
          <a>Contact</a>
        </p>
      <p>HomeBidder &copy; 2021</p>
    </div>
  </footer>
    </>
  );
}
