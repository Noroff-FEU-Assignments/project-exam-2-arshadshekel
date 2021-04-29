import React from "react";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import instagram from "../../images/instagram.png";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content container">
        <span>About HoliDaze</span>
        <LinkContainer to="/contact-us">
          <Link className="footer-link">Contact admin</Link>
        </LinkContainer>
        <span>Frequently asked questions</span>
        <div className="footer-content-socials">
          <img src={facebook} alt="facebook social" />
          <img src={twitter} alt="twitter social" />
          <img src={instagram} alt="instagram social" />
        </div>
      </div>
      <span className="footer-copyright text-center">
        Copyright © Holidaze - Exam project by Arshad Shakil
      </span>
    </div>
  );
}

export default Footer;
