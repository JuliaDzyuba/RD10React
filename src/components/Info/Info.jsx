import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { API_IMAGE_URL } from '../../constants';
import { getCurrentMovie } from '../../store/actions/actions';
import { deleteMovie } from '../../store/slices/movie.slice';
import Loader from '../Loader';

function Info() {
  const history = useHistory();
  const dispatch = useDispatch();
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
        <Link to="/">Go to all movies</Link>
        <h4>{movie && movie.title}</h4>
        <p>
          <strong>Produced by: </strong>
          {movie && movie.production_companies?.map((company) => ` ${company.name}`).toString()}
        </p>
        <p>
          <strong>Release: </strong>
          {movie && movie.release_date}
        </p>
        <Link to={`/movies/${movieId}/edit`} className={styles.editBtn}>Edit movie</Link>
        <button type="button" className={styles.deleteBtn} onClick={handleDelete}>Delete movie</button>
      </div>
      <div className={styles.info}>
        <div className={styles.poster}>
          <img src={movie && `${API_IMAGE_URL}${movie.backdrop_path}`} alt={movie && movie.title} />
        </div>
        <p>
          <strong>Site: </strong>
          <a href={movie && movie.homepage}>{movie && movie.homepage}</a>
        </p>
        <p>
          <strong>Genres: </strong>
          {movie && movie.genres?.map((g) => g.name).toString()}
        </p>
        <p>
          <strong>Description: </strong>
          {movie && movie.overview}
        </p>
        <p>
          <strong>Cast: </strong>
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
