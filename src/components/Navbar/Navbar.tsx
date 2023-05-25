import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { apiVersion } from "../../App";

export const MyNav = () => {
  return (
    <Navbar expand="lg">
        <Link to="/">
          <Navbar.Brand>
            <img
              src="https://api-onepiece.com/build/img/header_logo.png"
              alt="home"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-link">
            <div className="nav-link-item">
              <Link to="/">Home</Link>
              <Link to={`/${apiVersion}/characters`}>Characters</Link>
              <Link to={`/${apiVersion}/crews`}>Crews</Link>
              <Link to={`/${apiVersion}/fruits`}>Fruits</Link>
            </div>
            <div className="nav-link-users">
              <Link to={`/${apiVersion}/users/signup`}>Signup</Link>
              <Link to={`/${apiVersion}/users/login`}>Login</Link>
            </div>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};
