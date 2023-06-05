import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import "./ButtonSingleCard.css";
import { AuthContext } from "../../context/AuthProvider";

interface ButtonSingleProps {
  onClickEdit: () => void;
  onClickDelete: () => void;
}

const ButtonSingleCard: React.FC<ButtonSingleProps> = ({
  onClickEdit,
  onClickDelete,
}) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="button-single">
      {auth && (
        <>
          <Button onClick={onClickEdit} variant="secondary">
            Edit
          </Button>
          <Button onClick={onClickDelete} variant="secondary">
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default ButtonSingleCard;
