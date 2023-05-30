import React from "react";
import { Title } from "../Title/Title";
import "./Fruits.css";
import { useFruits } from "../../hooks/useFruits";
import { CardLoaderContainer } from "../CardLoader/CardLoader";
import { Link } from "react-router-dom";
import { Cards } from "../Card/Card";

export const Fruits = () => {
  const [fruits, isLoading] = useFruits({});

  return (
    <div className="fruits">
      <Title className="overlay-fruits" title="Fruits" />
      <div className="container">
        <div className="row justify-content-center">
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
