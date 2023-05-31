import React from "react";
import { Button, Form } from "react-bootstrap";
import "../Form.css";
import { Link } from "react-router-dom";
import { apiVersion } from "../../../App";

const Signup = () => {
  return (
    <section className="form-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 ">
            <Form className="form">
              <h1 className="form-title">Signup</h1>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Surname</Form.Label>
                <Form.Control required type="text" placeholder="Surname" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3 checkbox">
                <Form.Check className="pe-2" type="checkbox" required />
                <p>
                  I agree to the <a href="#">Terms & Conditions</a> and{" "}
                  <a href="#">Privacy Policy</a>
                </p>
              </Form.Group>
              <Button className="btn-click" variant="primary" type="submit">
                Submit
              </Button>
              <div className="d-flex mt-2 mt-3 justify-content-center">
                <p className="pe-1">Have an account? </p>
                <Link to={`/${apiVersion}/users/login`}> Login</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
