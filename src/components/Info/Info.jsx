import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { API_IMAGE_URL } from '../../constants';
import movieServices from '../../services/movieServices';
import { setCurrentMovie, addMovieInfo, deleteMovie } from '../../store/actions/actions';

function Info(props) {
  const [credits, setCredits] = useState([]);
  const { currentMovie: movie, movies } = props;
  const { movieId } = useParams();

  const history = useHistory();

  const idx = movies.findIndex((item) => item.id === +movieId);

  useEffect(() => {
    if (movieId) {
      if (!movies[idx].isChanged) {
        movieServices.getDetailById(movieId)
          .then((data) => {
            if (data) {
              props.setCurrentMovie(data);
              props.addMovieInfo(movieId, {
                genres: data.genres,
                homepage: data.homepage,
                production_companies: data.production_companies,
              });
            }
          });
      } else {
        const findMovie = movies.find((item) => item.id === +movieId);
        props.setCurrentMovie(findMovie);
      }

      movieServices.getCastById(movieId)
        .then((data) => {
          if (data) {
            setCredits(data.cast);
          }
        });
    }
  }, [movieId]);

  const handleDelete = () => {
    props.deleteMovie(movieId);
    history.push('/');
  };

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
            credits && credits.map((item) => (
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

const mapStateToProps = (state) => ({
  movies: state.movieReducer.moviesList,
  currentMovie: state.movieReducer.currentMovie,
});

const mapDispatchToProps = {
  setCurrentMovie,
  addMovieInfo,
  deleteMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);

Info.propTypes = {
  setCurrentMovie: PropTypes.func.isRequired,
  addMovieInfo: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    adult: PropTypes.bool,
    backdrop_path: PropTypes.string.isRequired,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
    original_language: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    popularity: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    title: PropTypes.string.isRequired,
    video: PropTypes.bool,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
    isChanged: PropTypes.bool,
  })).isRequired,
  currentMovie: PropTypes.shape({
    adult: PropTypes.bool,
    backdrop_path: PropTypes.string.isRequired,
    budget: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
    })).isRequired,
    homepage: PropTypes.string.isRequired,
    id: PropTypes.number,
    imdb_id: PropTypes.string,
    original_language: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string.isRequired,
    popularity: PropTypes.number,
    poster_path: PropTypes.string,
    production_companies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
    })).isRequired,
    production_countries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    release_date: PropTypes.string.isRequired,
    revenue: PropTypes.number,
    runtime: PropTypes.number,
    spoken_languages: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    status: PropTypes.string,
    tagline: PropTypes.string,
    title: PropTypes.string.isRequired,
    video: PropTypes.bool,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
  }),
};

Info.defaultProps = {
  currentMovie: {},
};
