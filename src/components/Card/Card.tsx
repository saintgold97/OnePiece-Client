import "./Card.css";
import { Character } from "../../models/character";
import { Card } from "react-bootstrap";

interface CardProps {
  className?: string,
  img?: string;
  title?: string;
  text1?: string;
  span1?: string;  
  text2?: string;
  span2?: string;
  text3?: string;
  span3?: string;
}

export const Cards: React.FC<CardProps> = ({
  className,
  img,
  title,
  text1,
  span1,
  text2,
  span2,
  text3,
  span3,
}) => {
  return (
    <section>
      <Card className={`${className}`}>
        <Card.Img title="Card-Image" variant="top" src={img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <span>{span1}</span> {text1}
          </Card.Text>
          <Card.Text>
            <span>{span2}</span> {text2}
          </Card.Text>
          <Card.Text>
            <span>{span3}</span> {text3}
          </Card.Text>
        </Card.Body>
      </Card>
    </section>
  );
};
