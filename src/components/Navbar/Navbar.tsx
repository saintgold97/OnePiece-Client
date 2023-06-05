import React, { useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { apiVersion } from "../../App";
import { AuthContext } from "../../context/AuthProvider";
import { useCookies } from "react-cookie";

export const MyNav = () => {
  const { auth, logout } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    removeCookie("authToken");
    navigate("/")
  };
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
            {auth ? (
              <>
                <Link to={`/${apiVersion}/users/me`}>Me</Link>
                <Button variant="secondary" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to={`/${apiVersion}/users/signup`}>Signup</Link>
                <Link to={`/${apiVersion}/users/login`}>Login</Link>
              </>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
