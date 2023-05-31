import React, { memo, useState } from "react";
import "./Crews.css";

import { Title } from "../Title/Title";
import { urlCrews, useCrews } from "../../hooks/useCrews";
import { CardLoaderContainer } from "../CardLoader/CardLoader";
import { Link } from "react-router-dom";
import { Cards } from "../Card/Card";
import { SearchBar } from "../SearchBar/SearchBar";
import { Crew } from "../../models/crews";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

export const Crews = memo(() => {
  const [textRomajiName, setRomajiName] = useState("");
  const [textEnglishName, settextEnglishName] = useState("");
  const [crews, isLoading] = useCrews({
    romaji_name: textRomajiName,
    english_name: textEnglishName,
  });

  //Status Add crews
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const [add, setAdd] = useState<Crew>({
    english_name: "",
    romaji_name: "",
    total_bounty: "",
    number_members: 0,
    urlImg: "",
  });

  const [addSuccess, setAddSuccess] = useState(false);

  const addCard = async () => {
    try {
      await axios.post(`${urlCrews}`, add);
      setAdd(add);
      setAddSuccess(true);
      console.log("Aggiunto", add);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="crews">
      <Title className="overlay-crews" title="Crews" />
      <div className="container">
        <h2>Filter</h2>
        <div className="search">
          <div className="pe-2 text-center">
            <label>Romaji Name</label>
            <SearchBar onSearch={setRomajiName} />
          </div>
          <div className="pe-2 text-center">
            <label>English Name</label>
            <SearchBar onSearch={settextEnglishName} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-4">
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
                img="https://wallpapercave.com/wp/wp2348054.jpg"
                title="Add Crew"
              />
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Crew</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3 input-group">
                    <Form.Control
                      value={add.english_name}
                      onChange={(e) => {
                        setAdd((prev) => ({
                          ...prev,
                          english_name: e.target.value,
                        }));
                      }}
                      type="text"
                      name="English name"
                      placeholder="English name"
                      required
                      autoFocus
                    />
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
                  </Form.Group>
                  <Form.Group className="mb-3 input-group">
                    <Form.Control
                      value={add.total_bounty}
                      onChange={(e) => {
                        setAdd((prev) => ({
                          ...prev,
                          total_bounty: e.target.value,
                        }));
                      }}
                      type="text"
                      name="Total bounty"
                      placeholder="Total bounty"
                      required
                    />
                    </Form.Group>
                  <Form.Group className="mb-3 input-group">
                     <Form.Label className="pe-2">Number Members</Form.Label>
                    <Form.Control
                      value={add.number_members}
                      onChange={(e) => {
                        setAdd((prev) => ({
                          ...prev,
                          number_members: Number(e.target.value),
                        }));
                      }}
                      type="text"
                      name="Number members"
                      placeholder="Number members"
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
          {isLoading && <CardLoaderContainer count={10} />}
          {!isLoading &&
            crews &&
            crews.map((item, index) => {
              return (
                <div
                  className="col-sm-6 col-md-6  col-lg-4"
                  key={`${index}-${item._id}`}
                >
                  <Link
                    className="text-decoration-none"
                    to={`/v1/crews/${item._id}`}
                  >
                    <Cards
                      img={`${item.urlImg}`}
                      title={`${item.english_name}`}
                      text1={`${item.romaji_name}`}
                      span1={"Romaji Name"}
                      text2={`${item.total_bounty}`}
                      span2={"Total Bounty"}
                      text3={`${item.number_members}`}
                      span3={"Number Members"}
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
