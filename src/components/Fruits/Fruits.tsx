import React, { useState } from "react";
import { Title } from "../Title/Title";
import "./Fruits.css";
import { urlFruits, useFruits } from "../../hooks/useFruits";
import { CardLoaderContainer } from "../CardLoader/CardLoader";
import { Link } from "react-router-dom";
import { Cards } from "../Card/Card";
import { SearchBar } from "../SearchBar/SearchBar";
import { Fruit } from "../../models/fruit";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

export const Fruits = () => {
  const [textType, setType] = useState("");
  const [fruits, isLoading] = useFruits({
    type: textType,
  });

  //Status Add crews
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const [add, setAdd] = useState<Fruit>({
    romaji_name: "",
    type: "",
    description: "",
    urlImg: "",
  });

  const [addSuccess, setAddSuccess] = useState(false);

  const addCard = async () => {
    try {
      await axios.post(`${urlFruits}`, add);
      setAdd(add);
      setAddSuccess(true);
      console.log("Aggiunto", add);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fruits">
      <Title className="overlay-fruits" title="Fruits" />
      <div className="container">
        <h2>Filter</h2>
        <div className="search">
          <div className="text-center">
            <label style={{ color: "black" }}>Type</label>
            <SearchBar onSearch={setType} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-9">
            <Button
              onClick={handleOpen}
              style={{
                background: "none",
                border: 0,
                height: "100%",
                width: "100%",
              }}
            >
              <Cards
                className="new-card"
                img="https://www.opgt.it/files/gallerie/utenti/usr-42551/frutti%20del%20diavolo.jpg"
                title="Add Fruit"
              />
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Fruit</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3 input-group">
                    <Form.Control
                      value={add.romaji_name}
                      onChange={(e) => {
                        setAdd((prev) => ({
                          ...prev,
                          romaji_name: e.target.value,
                        }));
                      }}
                      type="text"
                      name="Romaji name"
                      placeholder="Romaji name"
                      required
                    />
                    <Form.Control
                      value={add.type}
                      onChange={(e) => {
                        setAdd((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }));
                      }}
                      type="text"
                      name="Type"
                      placeholder="Type"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={add.description}
                      onChange={(e) => {
                        setAdd((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }));
                      }}
                      type="text"
                      name="Description"
                      placeholder="Description"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 input-group">
                    <Form.Control
                    as="textarea"
                    rows={3}
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
                </Form>
              </Modal.Body>
              <Modal.Footer className="mb-3 text-end">
                {addSuccess && <p>Successful add</p>}
                <Button
                  onClick={handleClose}
                  style={{ marginRight: "1rem" }}
                  variant="primary"
                >
                  Close
                </Button>
                <Button onClick={addCard} variant="primary">
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col-9">
            {isLoading && <CardLoaderContainer count={10} />}
            {!isLoading &&
              fruits &&
              fruits.map((item, index) => {
                return (
                  <Link
                    className="text-decoration-none"
                    to={`/v1/fruits/${item._id}`}
                    key={`${index}-${item._id}`}
                  >
                    <Cards
                      className="fruits-card"
                      img={item.urlImg}
                      title={item.romaji_name}
                      text1={item.type}
                      span1={"Type"}
                      text2={item.description}
                      span2={"Description"}
                    />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
