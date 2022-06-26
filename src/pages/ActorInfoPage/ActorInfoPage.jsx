import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_IMAGE_URL, API_KEY, API_URL } from '../../constants';
import movieServices from '../../services/movieServices';
import style from './styles.module.scss';

function ActorInfoPage() {
  const { actorId } = useParams();
  const [actor, setActor] = useState();

  useEffect(() => {
    if (actorId) {
      const url = `${API_URL}/person/${actorId}?api_key=${API_KEY}`;
      movieServices.getById(url)
        .then((data) => {
          if (data) {
            setActor(data);
          }
        });
    }
  }, [actorId]);

  return (
    <div className={style.container}>
      { actor ? (
        <>
          <div className={style.avatar}>
            <img src={actor.profile_path ? `${API_IMAGE_URL}${actor.profile_path}` : 'https://dummyimage.com/400x400/eeeeee/ffffff.jpg'} alt={actor.name} />
          </div>
          <div className={style.info}>
            <h1>{actor.name}</h1>
            <p>
              <strong>Birthday: </strong>
              {actor.birthday}
            </p>
            <p>
              <strong>Place of birth: </strong>
              {actor.place_of_birth}
            </p>
            <p>
              <strong>Biography: </strong>
              {actor.biography}
            </p>
          </div>
        </>
      ) : (
        <h2>
          Opps!
        </h2>
      )}
    </div>
  );
}

export default ActorInfoPage;
