import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { API_IMAGE_URL } from '../../constants';
import { getCurrentMovie } from '../../store/actions/actions';
import { deleteMovie, setCurrentMovie } from '../../store/slices/movie.slice';
import Loader from '../Loader';
import useTranslation from '../../hooks/useTranslation';

function Info() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.userReducer);
  const intl = useTranslation(lang);
  const {
    currentMovie: movie,
    moviesList: movies,
    isLoading,
    isError,
  } = useSelector((state) => state.movieReducer);
  const { movieId } = useParams();
  const idx = movies.findIndex((item) => item.id === +movieId);

  useEffect(() => {
    if (movieId) {
      if (!movies[idx].isChanged) {
        dispatch(getCurrentMovie(movieId));
      } else {
        dispatch(setCurrentMovie(movies[idx]));
      }
    }
  }, [movieId]);

  const handleDelete = () => {
    dispatch(deleteMovie(movieId));
    history.push('/');
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>Something went wrong ...</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.rating}>
        <Link to="/">{intl['app-infopage-link-to-mainpage']}</Link>
        <h4>{movie && movie.title}</h4>
        <p>
          <strong>
            {intl['app-infopage-produced-by']}
            {': '}
          </strong>
          {movie && movie.production_companies?.map((company) => ` ${company.name}`).toString()}
        </p>
        <p>
          <strong>
            {intl['app-infopage-release']}
            {': '}
          </strong>
          {movie && movie.release_date}
        </p>
        <Link to={`/movies/${movieId}/edit`} className={styles.editBtn}>{intl['app-infopage-button-edit']}</Link>
        <button type="button" className={styles.deleteBtn} onClick={handleDelete}>{intl['app-infopage-button-delete']}</button>
      </div>
      <div className={styles.info}>
        <div className={styles.poster}>
          <img src={movie && `${API_IMAGE_URL}${movie.backdrop_path}`} alt={movie && movie.title} />
        </div>
        <p>
          <strong>
            {intl['app-infopage-site']}
            {': '}
          </strong>
          <a href={movie && movie.homepage}>{movie && movie.homepage}</a>
        </p>
        <p>
          <strong>
            {intl['app-infopage-genres']}
            {': '}
          </strong>
          {movie && movie.genres?.map((g) => g.name).toString()}
        </p>
        <p>
          <strong>
            {intl['app-infopage-description']}
            {': '}
          </strong>
          {movie && movie.overview}
        </p>
        <p>
          <strong>
            {intl['app-infopage-cast']}
            {': '}
          </strong>
        </p>
        <ul className={styles.cast}>
          {
            movie && movie.cast.map((item) => (
              <li key={item.id}>
                <div className={styles.avatar}>
                  <img
                    src={item.profile_path
                      ? `${API_IMAGE_URL}${item.profile_path}`
                      : 'https://dummyimage.com/400x400/eeeeee/ffffff.jpg'}
                    alt={item.name}
                  />
                </div>
                <Link to={`/actor/${item.id}`} className={styles.actorLink}>
                  {item.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Info;
