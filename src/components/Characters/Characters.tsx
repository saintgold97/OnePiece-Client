import React from "react";
import { Cards } from "../Card/Card";
import { useCharacters } from "../../hooks/useCharacters";
import { CardLoaderContainer } from "../CardLoader/CardLoader";
import { Link } from "react-router-dom";
import { Title } from "../Title/Title";

export const Characters = () => {
  const [character, isLoading] = useCharacters({});

  return (
    <section className="characters">
      <Title/>
      <h2>Characters</h2>
      <div className="container">
        <div className="row">
          {isLoading && <CardLoaderContainer count={20} />}
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
                    to={`/character/${item._id}`}
                  >
                    <Cards
                      name={item.name}
                      role={item.role}
                      crew={item.crew}
                      fruit={item.fruit}
                      urlImg={item.urlImg}
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
