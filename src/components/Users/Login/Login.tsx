import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../Form.css";
import { Link, useNavigate } from "react-router-dom";
import { apiVersion } from "../../../App";
import axios from "axios";
import { urlUsers } from "../Signup/Signup";
import { User } from "../../../models/user";
import { useCookies } from "react-cookie";

const Login = () => {
  const [log, setLog] = useState<User>({ email: "", password: "" });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${urlUsers}/login`, log);
      const token = response.data.token;
      setCookie("token", token);
      setLog(log);
      navigate(`/${apiVersion}/users/me`);
    } catch (error: any) {
      if (error.response.status === 400) {
        window.alert("Invalid credential");
      }
    }
  };

  return (
    <>
      {success ? (
        <section className="form-container">
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to={"/"}>Go to home</Link>
          </p>
        </section>
      ) : (
        <section className="form-container">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-9 col-md-9 col-lg-6">
                <Form className="form">
                  <h1 className="form-title">Login</h1>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => {
                        setLog((prev) => ({ ...prev, email: e.target.value }));
                      }}
                      value={log.email}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setLog((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                      }}
                      value={log.password}
                      isInvalid={
                        log.password!.length > 0 && log.password!.length < 8
                      }
                    />
                    {log.password!.length > 0 && log.password!.length < 8 && (
                      <Form.Control.Feedback type="invalid">
                        The password must have at least 8 characters
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Button
                    className="btn-click"
                    variant="primary"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <div className="d-flex mt-3 justify-content-center">
                    <p className="pe-1">Don't have an account?</p>
                    <Link to={`/${apiVersion}/users/signup`}>Signup</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
