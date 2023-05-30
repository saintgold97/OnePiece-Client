import React, { memo } from 'react'
import "./Crews.css"
import { Title } from "../Title/Title";
import { useCrews } from '../../hooks/useCrews';
import { CardLoaderContainer } from '../CardLoader/CardLoader';
import { Link } from 'react-router-dom';
import { Cards } from '../Card/Card';

export const Crews = memo(() => {
  const [crews, isLoading] = useCrews({});

  return (
    <section className='crews'>
        <Title className='overlay-crews' title='Crews' />
        <div className="container">
        <div className="row">
          {isLoading && <CardLoaderContainer count={10} />}
          {!isLoading &&
            crews &&
            crews.map((item, index) => {
              return (
                <div
                  className="col-sm-6 col-md-6  col-lg-4"
                  key={`${index}-${item._id}`}
                >
                  <Link
                    className="text-decoration-none"
                    to={`/v1/crews/${item._id}`}
                  >
                    <Cards
                      img={`${item.urlImg}`}
                      title={`${item.english_name}`}
                      text1={`${item.romaji_name}`}
                      span1={"Romaji Name"}
                      text2={`${item.total_bounty}`}
                      span2={"Total Bounty"}
                      text3={`${item.number_members}`}
                      span3={"Number Members"}
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>

  )
})
