import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import withAuth from '../../hoc/withAuth';
import { getCurrentActor } from '../../store/actions/actions';
import useTranslation from '../../hooks/useTranslation';
import style from './styles.module.scss';

function ActorInfoPage() {
  const { actorId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentActor: actor, isLoading, isError } = useSelector((state) => state.movieReducer);

  const { lang } = useSelector((state) => state.userReducer);
  const intl = useTranslation(lang);

  useEffect(() => {
    if (actorId) {
      dispatch(getCurrentActor(actorId));
    }
  }, [actorId]);

  const handleGoBack = () => {
    history.goBack();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>Something went wrong ...</h1>;
  }

  return (
    <div className={style.container}>
      { actor ? (
        <>
          <div className={style.avatar}>
            <img src={actor.profile_path ? `${process.env.REACT_APP_API_IMAGE_URL}${actor.profile_path}` : 'https://dummyimage.com/400x400/eeeeee/ffffff.jpg'} alt={actor.name} />
          </div>
          <div className={style.info}>
            <button type="button" onClick={handleGoBack}>{intl['app-actorpage-button-back']}</button>
            <h1>{actor.name}</h1>
            <p>
              <strong>{intl['app-actorpage-birthday']}</strong>
              {actor.birthday}
            </p>
            <p>
              <strong>{intl['app-actorpage-place']}</strong>
              {actor.place_of_birth}
            </p>
            <p>
              <strong>{intl['app-actorpage-biography']}</strong>
              {actor.biography}
            </p>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default withAuth(ActorInfoPage);
