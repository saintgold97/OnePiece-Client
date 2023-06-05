import React from "react";
import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";
import { apiVersion } from "../../App";
import { Button } from "react-bootstrap";

export const Footer = () => {
    const navigate = useNavigate()
  return (
    <footer id="footer" className="footer-1">
      <div className="main-footer widgets-dark typo-light">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget subscribe no-box">
                <h5 className="widget-title">
                  Saint Gold<span></span>
                </h5>
                <p>About the company, little description will goes here.. </p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Quick Links<span></span>
                </h5>
                <ul className="thumbnail-widget">
                  <li>
                    <div className="thumb-content">
                      <Link to="/">Home</Link>
                    </div>
                  </li>
                  <li>
                    <div className="thumb-content">
                      <Link to={`${apiVersion}/characters`}>Characters</Link>
                    </div>
                  </li>
                  <li>
                    <div className="thumb-content">
                    <Link to={`/${apiVersion}/crews`}>Crews</Link>
                    </div>
                  </li>
                  <li>
                    <div className="thumb-content">
                    <Link to={`/${apiVersion}/fruits`}>Fruits</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Get Started<span></span>
                </h5>
                <p>Get access to your account to join our community.</p>
                <Button
                variant="secondary"
                onClick={()=>navigate(`${apiVersion}/users/signup`)}
                >
                  Subscribe Now
                </Button>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Contact Us<span></span>
                </h5>

                <ul className="social-footer2">
                  <li className="">
                    <Link
                      title="Github"
                      target="_blank"
                      to="https://github.com/saintgold97"
                    ><i className="bi bi-github"></i></Link>
                  </li>
                  <li className="">
                    <Link
                      title="LinkedIn"
                      target="_blank"
                      to="https://www.linkedin.com/in/roberto-santoro-91749b141/"
                    ><i className="bi bi-linkedin"></i></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>Copyright Saint Gold © 2023. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
