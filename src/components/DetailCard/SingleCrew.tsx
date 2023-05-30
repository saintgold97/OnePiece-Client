import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCrews, urlCrews } from "../../hooks/useCrews";
import { Crew } from "../../models/crews";
import { Button, Card, Form, ListGroup, Modal } from "react-bootstrap";
import "./DetailCard.css";
import ButtonSingleCard from "../../ButtonSingleCard/ButtonSingleCard";

const SingleCrew = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [crew, setCrew] = useState<Crew | null>(null);
  const [allCrews] = useCrews({});

  //Status Edit by ID
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const [editStatus, setEditStatus] = useState<Crew>({
    english_name: "",
    romaji_name: "",
    total_bounty: "",
    number_members: 0,
    urlImg: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const editCard = async () => {
    try {
      const updatedStatus = {
        english_name:
          editStatus.english_name !== ""
            ? editStatus.english_name
            : crew!.english_name,
        romaji_name:
          editStatus.romaji_name !== ""
            ? editStatus.romaji_name
            : crew!.romaji_name,
        total_bounty:
          editStatus.total_bounty !== ""
            ? editStatus.total_bounty
            : crew!.total_bounty,
        number_members:
          editStatus.number_members !== Number("")
            ? Number(editStatus.number_members)
            : crew!.number_members,
        urlImg: editStatus.urlImg !== "" ? editStatus.urlImg : crew!.urlImg,
      };
      await axios.patch(`${urlCrews}/${_id}`, updatedStatus);
      setEditStatus(editStatus);
      setUpdateSuccess(true);
      console.log("Aggiornato");
      setShowEdit(false);
      //navigate(`/v1/crews/${_id}`);
    } catch (error) {
      console.error(error);
      console.log("Sono qui");
    }
  };

  //Status Delete by Id
  const [deleteStatus, setDeleteStatus] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const deleteCard = async () => {
    try {
      await axios.delete(`${urlCrews}/${_id}`);
      setDeleteStatus("Delete successful");
      navigate("/v1/crews");
    } catch (error) {
      setDeleteStatus("Error delete card");
      console.error(error);
    }
  };

  //Status Get Character
  useEffect(() => {
    axios.get<Crew>(`${urlCrews}/${_id}`).then((response) => {
      setCrew(response.data);
    });
  }, [_id]);
  return (
    <section>
      <div className="title-single">
        <h1>{crew?.english_name}</h1>
      </div>
      <div className="container">
        <div className="row single-change">
          <div className="col-sm-12 col-md-4">
            <div className="all-item">
              <Button
                onClick={() => {
                  navigate("/v1/crews");
                }}
              >
                Return
              </Button>
              <h2>All Crews</h2>
              <div className="list-group">
                {allCrews.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      className="list-group-item list-group-item-action theme-link"
                      to={`/v1/crews/${item._id}`}
                    >
                      {item.english_name}
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
                    src={crew?.urlImg}
                  />
                </div>
                <Card.Body className="card-single-body">
                  <Card.Title>Details</Card.Title>
                  <ListGroup.Item>
                    <span>Romaji name:</span> {crew?.romaji_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>Total Bounty:</span> {crew?.total_bounty}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>Number Members:</span> {crew?.number_members}
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
          <Modal.Title>Edit Crew</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>English name</Form.Label>
              <Form.Control
                value={editStatus.english_name}
                onChange={(e) => {
                  setEditStatus((prev)=>({
                    ...prev,
                    english_name: e.target.value,
                  }));
                }}
                type="text"
                name="english_name"
                placeholder="english_name"
                autoFocus
              />
            </Form.Group>
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
            <Form.Label>Total bounty</Form.Label>
              <Form.Control
                value={editStatus.total_bounty}
                onChange={(e) => {
                  setEditStatus((prev)=>({
                    ...prev,
                    total_bounty: e.target.value,
                  }));
                }}
                type="text"
                name="total_bounty"
                placeholder="total_bounty"
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Number members</Form.Label>
              <Form.Control
                value={editStatus.number_members}
                onChange={(e) =>
                  setEditStatus((prev)=>({
                    ...prev,
                    number_members: Number(e.target.value),
                  }))
                }
                type="number"
                name="number_members"
                placeholder="number_members"
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
            Delete and return to crews
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default SingleCrew;

/*{
  <article>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="list-group">
                {character
                  .filter((item) => {
                    const foundCrew = allCrews.some((item2) => item.crew === item2.romaji_name);
                    if (foundCrew) {
                      console.log('Item:', item.crew);
                    }
                    return foundCrew;
                  })
                  .map((item, index) => (
                    <Link
                      key={index}
                      className="list-group-item list-group-item-action theme"
                      to={`/v1/characters/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </article>
}*/
