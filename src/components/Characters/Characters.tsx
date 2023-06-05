import React, { memo, useContext, useState } from "react";
import { MyCard } from "../MyCard/MyCard";
import { urlCharacters, useCharacters } from "../../hooks/useCharacters";
import { CardLoaderContainer } from "../CardLoader/CardLoader";
import { Link } from "react-router-dom";
import { Title } from "../Title/Title";
import "./Characters.css";

import { SearchBar } from "../SearchBar/SearchBar";
import { Button, Form, Modal } from "react-bootstrap";
import { Character } from "../../models/character";
import axios from "axios";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../context/AuthProvider";

export const Characters = memo(() => {
  const [textName, setTextName] = useState("");
  const [textRole, setTextRole] = useState("");
  const [textCrew, setTextCrew] = useState("");
  let [character, isLoading] = useCharacters({
    name: textName,
    role: textRole,
    crew: textCrew,
  });

  //Status Add characters
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const [add, setAdd] = useState<Character>({
    name: "",
    role: "",
    size: "",
    age: 0,
    bounty: "",
    fruit: "",
    crew: "",
    urlImg: "",
  });

  const [addSuccess, setAddSuccess] = useState(false);

  const [cookie, setCookie] = useCookies(["token"]);
  const token = cookie.token;

  const addCard = async () => {
    try {
      await axios.post(`${urlCharacters}`, add, {
        headers: {
          authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      setAdd(add);
      setAddSuccess(true);
    } catch (error) {
      console.error(error);
      console.log("sono qui catch");
    }
  };

  const { auth } = useContext(AuthContext);

  return (
    <section className="characters">
      <Title className="overlay-characters" title="Characters" />
      <div className="container">
        <h2>Filter</h2>
        <div className="search">
          <div className="pe-2 text-center">
            <label>Name</label>
            <SearchBar onSearch={setTextName} />
          </div>
          <div className="pe-2 text-center">
            <label>Role</label>
            <SearchBar onSearch={setTextRole} />
          </div>
          <div className="pe-2 text-center">
            <label>Crew</label>
            <SearchBar onSearch={setTextCrew} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {auth && (
            <div className="col-sm-6 col-md-6 col-lg-4">
              <Button
                onClick={handleOpen}
                style={{ background: "none", border: 0, height: "100%" }}
              >
                <MyCard
                  className="new-card"
                  img="https://www.staynerd.com/wp-content/uploads/2021/05/one-piece-classifica-personaggi.jpg"
                  title="Add Character"
                />
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Characters</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3 input-group">
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
                      <Form.Control
                        value={add.role}
                        onChange={(e) => {
                          setAdd((prev) => ({
                            ...prev,
                            role: e.target.value,
                          }));
                        }}
                        type="text"
                        name="role"
                        placeholder="Role"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 input-group">
                      <Form.Control
                        value={add.size}
                        onChange={(e) => {
                          setAdd((prev) => ({
                            ...prev,
                            size: e.target.value,
                          }));
                        }}
                        type="text"
                        name="size"
                        placeholder="Size"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 input-group">
                      <Form.Label className="pe-2">Age</Form.Label>
                      <Form.Control
                        value={add.age}
                        onChange={(e) => {
                          setAdd((prev) => ({
                            ...prev,
                            age: Number(e.target.value),
                          }));
                        }}
                        type="text"
                        name="age"
                        placeholder="Age"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 input-group">
                      <Form.Control
                        value={add.bounty}
                        onChange={(e) => {
                          setAdd((prev) => ({
                            ...prev,
                            bounty: e.target.value,
                          }));
                        }}
                        type="text"
                        name="bounty"
                        placeholder="Bounty"
                        required
                      />
                      <Form.Control
                        value={add.fruit}
                        onChange={(e) => {
                          setAdd((prev) => ({
                            ...prev,
                            fruit: e.target.value,
                          }));
                        }}
                        type="text"
                        name="fruit"
                        placeholder="Fruit"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 input-group">
                      <Form.Control
                        value={add.crew}
                        onChange={(e) => {
                          setAdd((prev) => ({
                            ...prev,
                            crew: e.target.value,
                          }));
                        }}
                        type="text"
                        name="crew"
                        placeholder="Crew"
                        required
                      />
                      <Form.Control
                        value={add.urlImg}
                        onChange={(e) => {
                          setAdd((prev) => ({
                            ...prev,
                            urlImg: e.target.value,
                          }));
                        }}
                        type="text"
                        name="urlImg"
                        placeholder="UrlImg"
                      />
                    </Form.Group>
                    <div className="text-end">
                      {addSuccess && <p>Successful add</p>}
                      <Button
                        onClick={handleClose}
                        style={{ marginRight: "1rem" }}
                        variant="primary"
                      >
                        Close
                      </Button>
                      <Button onClick={addCard} variant="primary" type="submit">
                        Add
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>
          )}
          {isLoading && <CardLoaderContainer count={10} />}
          {!isLoading &&
            character &&
            character.map((item, index) => {
              return (
                <div
                  className="col-sm-6 col-md-6  col-lg-4"
                  key={`${index}-${item._id}`}
                >
                  <Link
                    className="text-decoration-none"
                    to={`/v1/characters/${item._id}`}
                  >
                    <MyCard
                      img={`${item.urlImg}`}
                      title={`${item.name}`}
                      text1={`${item.role}`}
                      span1={"Role"}
                      text2={`${item.crew}`}
                      span2={"Crews"}
                      text3={item.fruit ? `${item.fruit}` : "N/A"}
                      span3={"Fruit"}
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
});
