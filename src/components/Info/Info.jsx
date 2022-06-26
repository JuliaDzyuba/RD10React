import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { API_IMAGE_URL, API_KEY, API_URL } from '../../constants';
import movieServices from '../../services/movieServices';
import { setCurrentMovie } from '../../store/actions/actions';

function Info(props) {
  const [credits, setCredits] = useState([]);
  const { currentMovie: movie } = props;
  const { movieId } = useParams();

  useEffect(() => {
    if (movieId) {
      const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;
      movieServices.getById(url)
        .then((data) => {
          if (data) {
            props.setCurrentMovie(data);
          }
        });

      const castUrl = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
      movieServices.getById(castUrl)
        .then((data) => {
          if (data) {
            setCredits(data.cast);
          }
        });
    }
  }, [movieId]);
  return (
    <div className={styles.container}>
      <div className={styles.rating}>
        <h4>{movie && movie.title}</h4>
        <p>
          <strong>Produced by: </strong>
          {movie && movie.production_companies.map((company) => ` ${company.name}`).toString()}
        </p>
        <p>
          <strong>Release: </strong>
          {movie && movie.release_date}
        </p>
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
          {movie && movie.genres.map((g) => g.name).toString()}
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
                    src={item.profile_path ? `${API_IMAGE_URL}${item.profile_path}` : 'https://dummyimage.com/400x400/eeeeee/ffffff.jpg'}
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
  currentMovie: state.movieReducer.currentMovie,
});

const mapDispatchToProps = {
  setCurrentMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);

Info.propTypes = {
  setCurrentMovie: PropTypes.func.isRequired,
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
