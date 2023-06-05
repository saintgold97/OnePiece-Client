import axios from "axios";
import React, { useEffect, useState } from "react";
import { User } from "../../../models/user";
import { urlUsers } from "../Signup/Signup";
import { Card, ListGroup } from "react-bootstrap";
import { useCookies } from "react-cookie";

export const Me = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cookie, setCookie] = useCookies(["token"]);
  const token = cookie.token;

  useEffect(() => {
    axios
      .get<User>(`${urlUsers}/me`, {
        headers: {
        authorization: `${token}`,
        "Content-Type": "application/json",
      }})
      .then((response: any) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div style={{ padding: "50px" }}>
      <Card style={{ height: "11.5rem", width: "20rem" }}>
        <Card.Body
          className="card-single-body text-center"
          style={{ width: "100%" }}
        >
          <Card.Title>Profile</Card.Title>
          <ListGroup.Item>
            <span>Name:</span> {user?.name}
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Surname:</span> {user?.surname}
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Email:</span> {user?.email}
          </ListGroup.Item>
        </Card.Body>
      </Card>
    </div>
  );
};
