import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../Form.css";
import { Link } from "react-router-dom";
import { apiVersion } from "../../../App";
import { User } from "../../../models/user";
import axios from "axios";
export const urlUsers = "http://localhost:3001/v1/users";

const Signup = () => {
  const [add, setAdd] = useState<User>({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [addSuccess, setAddSuccess] = useState(false);

  const addUser = async () => {
    try {
      await axios.post(`${urlUsers}/signup`, add);
      setAdd(add);
      console.log("Aggiunto", add);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="form-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-9 col-md-9 col-lg-6 ">
            <Form className="form">
              <h1 className="form-title">Signup</h1>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={add.name}
                  onChange={(e) => {
                    setAdd((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  value={add.surname}
                  onChange={(e) => {
                    setAdd((prev) => ({
                      ...prev,
                      surname: e.target.value,
                    }));
                  }}
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={add.email}
                  onChange={(e) => {
                    setAdd((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={add.password}
                  onChange={(e) => {
                    setAdd((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3 checkbox">
                <Form.Check className="pe-2" type="checkbox" required />
                <p>
                  I agree to the <a href="#">Terms & Conditions</a> and{" "}
                  <a href="#">Privacy Policy</a>
                </p>
              </Form.Group>
              <Button onClick={addUser} className="btn-click" variant="primary" type="submit">
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
