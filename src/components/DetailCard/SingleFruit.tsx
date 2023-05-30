import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFruits, urlFruits } from "../../hooks/useFruits";
import { Fruit } from "../../models/fruit";
import { Button, Card, Form, ListGroup, Modal } from "react-bootstrap";
import "./DetailCard.css";
import ButtonSingleCard from "../../ButtonSingleCard/ButtonSingleCard";

const SingleFruit = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [fruit, setfruit] = useState<Fruit | null>(null);
  const [allFruits] = useFruits({});

  //Status Edit by ID
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const [editStatus, setEditStatus] = useState<Fruit>({
    romaji_name: "",
    type: "",
    description: "",
    urlImg: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const editCard = async () => {
    try {
      const updatedStatus = {
        romaji_name:
          editStatus.romaji_name !== ""
            ? editStatus.romaji_name
            : fruit!.romaji_name,
        type: editStatus.type !== "" ? editStatus.type : fruit!.type,
        description:
          editStatus.description !== ""
            ? editStatus.description
            : fruit!.description,
        urlImg: editStatus.urlImg !== "" ? editStatus.urlImg : fruit!.urlImg,
      };
      await axios.patch(`${urlFruits}/${_id}`, updatedStatus);
      setEditStatus(editStatus);
      setUpdateSuccess(true);
      console.log("Aggiornato");
      setShowEdit(false);
     // navigate(`/v1/crews/${_id}`);
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
      await axios.delete(`${urlFruits}/${_id}`);
      setDeleteStatus("Delete successful");
      navigate("/v1/fruits");
    } catch (error) {
      setDeleteStatus("Error delete card");
      console.error(error);
    }
  };

  //Status Get Character
  useEffect(() => {
    axios.get<Fruit>(`${urlFruits}/${_id}`).then((response) => {
      setfruit(response.data);
    });
  }, [_id]);

  return (
    <section>
      <div className="title-single">
        <h1>{fruit?.romaji_name}</h1>
      </div>
      <div className="container">
        <div className="row single-change">
          <div className="col-sm-12 col-md-4">
            <div className="all-item">
              <Button
                onClick={() => {
                  navigate("/v1/fruits");
                }}
              >
                Return
              </Button>
              <h2>All fruits</h2>
              <div className="list-group">
                {allFruits.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      className="list-group-item list-group-item-action theme-link"
                      to={`/v1/fruits/${item._id}`}
                    >
                      {item.romaji_name}
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
                    src={fruit?.urlImg}
                  />
                </div>
                <Card.Body className="card-single-body">
                  <Card.Title>Details</Card.Title>
                  <ListGroup.Item>
                    <span>Type:</span> {fruit?.type}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>Description:</span> {fruit?.description}
                  </ListGroup.Item>
                  <ButtonSingleCard
                    onClickEdit={handleShowEdit}
                    onClickDelete={handleShowDelete}
                  />
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
            <Form.Label>Romaji name</Form.Label>
              <Form.Control
                value={editStatus.romaji_name}
                onChange={(e) => {
                  setEditStatus((prev)=>({
                    ...prev,
                    romaji_name: e.target.value,
                  }));
                }}
                type="text"
                name="romaji_name"
                placeholder="romaji_name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
              <Form.Control
                value={editStatus.type}
                onChange={(e) => {
                  setEditStatus((prev)=>({
                    ...prev,
                    type: e.target.value,
                  }));
                }}
                type="text"
                name="type"
                placeholder="type"
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
              <Form.Control
                value={editStatus.description}
                onChange={(e) => {
                  setEditStatus((prev)=>({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
                type="text"
                name="description"
                placeholder="description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>UrlImg</Form.Label>
              <Form.Control
                value={editStatus.urlImg}
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
            Delete and return to fruits
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default SingleFruit;
