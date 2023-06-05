import React from "react";
import { Link } from "react-router-dom";

const EmailConfirmation = () => {

  return (
    <div style={{height:"52.3vh", padding:"4rem"}}>
      <h1>Conferma Email</h1>
      <Link to="https://ethereal.email/messages">Clicca qui per confermare il link</Link>
    </div>
  );
};

export default EmailConfirmation;
