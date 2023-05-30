import React, { memo } from "react";
import { Cards } from "../Card/Card";
import { useCharacters } from "../../hooks/useCharacters";
import { CardLoaderContainer } from "../CardLoader/CardLoader";
import { Link } from "react-router-dom";
import { Title } from "../Title/Title";
import "./Characters.css";

export const Characters = memo(() => {
  let [character, isLoading] = useCharacters({});

  return (
    <section className="characters">
      <Title className="overlay-characters" title="Characters" />
      <div className="container">
        <div className="row">
          {isLoading && <CardLoaderContainer count={10} />}
          {!isLoading &&
            character &&
            character.map((item, index) => {
              return (
                <div
                  className="col-sm-6 col-md-6  col-lg-4"
                  key={`${index}-${item._id}`}
                >
                  <Link
                    className="text-decoration-none"
                    to={`/v1/characters/${item._id}`}
                  >
                    <Cards
                      img={`${item.urlImg}`}
                      title={`${item.name}`}
                      text1={`${item.role}`}
                      span1={"Role"}
                      text2={`${item.crew}`}
                      span2={"Crews"}
                      text3={item.fruit ? `${item.fruit}` : "N/A"}
                      span3={"Fruit"}
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
