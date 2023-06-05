import React from "react";
import { Title } from "../Title/Title";
import "./Home.css";
import { MyCard } from "../MyCard/MyCard";
import { Link, useNavigate } from "react-router-dom";
import { apiVersion } from "../../App";
import { Button } from "react-bootstrap";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <Title className="overlay-home" title="Home" />
      <section id="section-description">
        <div className="container">
          <h2>Presentation</h2>
          <p style={{ textAlign: "justify", padding: "10px" }}>
            One Piece is a popular manga and anime created by Eiichiro Oda. The
            story revolves around the adventures of Monkey D. Luffy, a young boy
            with dreams of becoming the Pirate King. Luffy is endowed with an
            eccentric personality, but also with great determination and an iron
            will. After accidentally eating the devil fruit Gom Gom, his body
            acquired the property of rubber, making it elastic and giving him
            incredible physical abilities. Luffy then decides to form his crew,
            the Straw Hat Pirates, and embarks on an adventurous journey in
            search of the legendary treasure called 'One Piece', left behind by
            the late Pirate King, Gol D. Roger.
          </p>
        </div>
      </section>
      <section id="section-page">
        <h2>Join in the exploration of the wonderful world of One Piece</h2>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-9 col-md-4">
              <Link
                to={`/${apiVersion}/characters`}
                style={{ textDecoration: "none" }}
              >
                <MyCard
                  className="list-section"
                  img="https://www.staynerd.com/wp-content/uploads/2021/05/one-piece-classifica-personaggi.jpg"
                  title="Characters"
                ></MyCard>
              </Link>
            </div>
            <div className="col-sm-9 col-md-4">
              <Link
                to={`/${apiVersion}/crews`}
                style={{ textDecoration: "none" }}
              >
                <MyCard
                  className="list-section"
                  img="https://wallpapercave.com/wp/wp2348054.jpg"
                  title="Crews"
                ></MyCard>
              </Link>
            </div>
            <div className="col-sm-9 col-md-4">
              <Link
                to={`/${apiVersion}/fruits`}
                style={{ textDecoration: "none" }}
              >
                <MyCard
                  className="list-section"
                  img="https://www.opgt.it/files/gallerie/utenti/usr-42551/frutti%20del%20diavolo.jpg"
                  title="Fruits"
                ></MyCard>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="section-access">
        <div className="container">
          <h2>Join the community</h2>
          <div className="d-flex align-items-center flex-column">
            <p>
              If you wish to add, edit or delete an item, you must register. If
              you already have a profile, please log in.
            </p>
            <div className="d-flex">
              <Button
              className="me-3"
                variant="secondary"
                onClick={() => navigate(`${apiVersion}/users/signup`)}
              >
                Subscribe Now
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate(`${apiVersion}/users/login`)}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
