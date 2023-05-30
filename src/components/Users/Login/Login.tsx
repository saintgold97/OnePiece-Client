import React from "react";
import { Button, Form } from "react-bootstrap";
import "../Form.css";

const Login = () => {
  return (
    <section className="form-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <Form className="form">
              <h1 className="form-title">Login</h1>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" />
              </Form.Group>
              <Button className="btn-click" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
