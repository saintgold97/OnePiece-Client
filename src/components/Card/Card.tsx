import "./Card.css";
import { Character } from "../../models/character";
import {Card} from "react-bootstrap"

export const Cards = ({ name, role, crew, fruit, urlImg }:Character) => {

  return (
    <section>
      <Card>
        <Card.Img title="Card-Image" variant="top" src={urlImg} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text><span>Role:</span> {role}</Card.Text>
          <Card.Text><span>crew:</span> {crew}</Card.Text>
          {fruit && <Card.Text><span>fruit:</span> {fruit}</Card.Text>}
        </Card.Body>
      </Card>
    </section>
  );
};