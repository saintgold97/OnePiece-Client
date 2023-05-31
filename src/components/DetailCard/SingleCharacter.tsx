import React, { useEffect, useState } from "react";
import { urlCharacters, useCharacters } from "../../hooks/useCharacters";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Character } from "../../models/character";
import { Button, Card, Form, ListGroup, Modal } from "react-bootstrap";
import "./DetailCard.css";
import ButtonSingleCard from "../ButtonSingleCard/ButtonSingleCard";

export const SingleCharacter = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [allCharacters] = useCharacters({});

  //Status Edit by ID
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const [editStatus, setEditStatus] = useState<Character>({
    name: "",
    role: "",
    size: "",
    age: Number(''),
    bounty: "",
    fruit: "",
    crew: "",
    urlImg: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const editCard = async () => {
    try {
      const updatedStatus = {
        name: editStatus.name !== "" ? editStatus.name : character!.name,
        role: editStatus.role !== "" ? editStatus.role : character!.role,
        size: editStatus.size !== "" ? editStatus.size : character!.size,
        age: editStatus.age !== Number("") ? Number(editStatus.age) :  character!.age,
        bounty: editStatus.bounty !== "" ? editStatus.bounty : character!.bounty,
        fruit: editStatus.fruit !== "" ? editStatus.fruit : character!.fruit,
        crew: editStatus.crew !== "" ? editStatus.crew : character!.crew,
        urlImg: editStatus.urlImg !== "" ? editStatus.urlImg : character!.urlImg,
      };
      await axios.patch(`${urlCharacters}/${_id}`, updatedStatus);
      setEditStatus(editStatus); 
      setUpdateSuccess(true)
      console.log("Aggiornato");
      setShowEdit(false)

    } catch (error) {
      console.error(error);
      console.log("Sono qui");
    }
  };

  //Status Delete by ID
  const [deleteStatus, setDeleteStatus] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const deleteCard = async () => {
    try {
      await axios.delete(`${urlCharacters}/${_id}`);
      setDeleteStatus("Delete successful");
      navigate("/v1/characters");
    } catch (error) {
      setDeleteStatus("Error delete card");
      console.error(error);
    }
  };

  //Status Get Character
  useEffect(() => {
    axios.get<Character>(`${urlCharacters}/${_id}`).then((response) => {
      setCharacter(response.data);
    });
  }, [_id]);
  return (
    <section>
      <div className="title-single">
        <h1>{character?.name}</h1>
      </div>
      <div className="container">
        <div className="row single-change">
          <div className="col-sm-12 col-md-4">
            <div className="all-item">
              <Button
                onClick={() => {
                  navigate("/v1/characters");
                }}
              >
                Return
              </Button>
              <h2>All characters</h2>
              <div className="list-group">
                {allCharacters.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      className="list-group-item list-group-item-action theme-link"
                      to={`/v1/characters/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-8">
            <div className="single-item">
              <Card className="detail-item">
                <div className="card-image">
                  <Card.Img
                    style={{ height: "100%" }}
                    variant="top"
                    src={character?.urlImg}
                  />
                </div>
                <Card.Body className="card-single-body">
                  <Card.Title>Details</Card.Title>
                  <ListGroup.Item>
                    <span>Role:</span> {character?.role}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>Size:</span> {character?.size}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>Age:</span> {character?.age}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>Bounty:</span> {character?.bounty}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {character?.fruit && (
                      <>
                        <span>Fruit:</span> {character?.fruit}
                      </>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>Crew:</span> {character?.crew}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <ButtonSingleCard
                      onClickEdit={handleShowEdit}
                      onClickDelete={handleShowDelete}
                    />
                  </ListGroup.Item>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for edit */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit character</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                defaultValue={character?.name}
                onChange={(e) => {
                  setEditStatus((prev)=>({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
                type="text"
                name="name"
                placeholder="name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
              <Form.Control
                defaultValue={character?.role}
                onChange={(e) => {
                  setEditStatus((prev)=>({
                    ...prev,
                    role: e.target.value,
                  }));
                }}
                type="text"
                name="role"
                placeholder="role"
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Size</Form.Label>
              <Form.Control
                defaultValue={character?.size}
                onChange={(e) => {
                  setEditStatus((prev)=>({
                    ...prev,
                    size: e.target.value,
                  }));
                }}
                type="text"
                name="size"
                placeholder="size"
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
              <Form.Control
                defaultValue={character?.age}
                onChange={(e) =>
                  setEditStatus((prev)=>({
                    ...prev,
                    age: Number(e.target.value),
                  }))
                }
                type="number"
                name="age"
                placeholder="age"
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Bounty</Form.Label>
              <Form.Control
                defaultValue={character?.bounty}
                onChange={(e) => {
                  setEditStatus((prev)=>({
                    ...prev,
                    bounty: e.target.value,
                  }));
                }}
                type="text"
                name="bounty"
                placeholder="bounty"
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Fruit</Form.Label>
              <Form.Control
                defaultValue={character?.fruit}
                onChange={(e) => {
                  setEditStatus((prev)=>({
                    ...prev,
                    fruit: e.target.value,
                  }));
                }}
                type="text"
                name="fruit"
                placeholder="fruit"
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Crew</Form.Label>
              <Form.Control
                defaultValue={character?.crew}
                onChange={(e) => {
                  setEditStatus((prev)=>({
                    ...prev,
                    crew: e.target.value,
                  }));
                }}
                type="text"
                name="crew"
                placeholder="crew"
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>UrlImg</Form.Label>
              <Form.Control
                defaultValue={character?.urlImg}
                onChange={(e) => {
                  setEditStatus((prev)=>({
                    ...prev,
                    urlImg: e.target.value,
                  }));
                }}
                type="text"
                name="urlImg"
                placeholder="urlImg"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {updateSuccess && <p>Successful update</p>}
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={editCard}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal for delete */}
      <Modal
        show={showDelete}
        onHide={handleCloseDelete}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button onClick={deleteCard} variant="secondary">
            Delete and return to characters
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};
