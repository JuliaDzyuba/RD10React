import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { API_IMAGE_URL } from '../../constants';

function Info({ movie }) {
  return (
    <>
      <div className={styles.rating}>
        <h4>{movie.title}</h4>
        <p>Likes: 000</p>
        <div>Stars: </div>
      </div>
      <div className={styles.info}>
        <div className={styles.poster}>
          <img src={`${API_IMAGE_URL}${movie.backdrop_path}`} alt={movie.title} />
        </div>
        <p><strong>Director: </strong></p>
        <p><strong>Actors: </strong></p>
        <p>
          <strong>Genres: </strong>
          {movie.genres.map((g) => g.name).toString()}
        </p>
        <p>
          <strong>Description: </strong>
          {movie.overview}
        </p>
      </div>
    </>
  );
}

export default Info;

Info.propTypes = {
  movie: PropTypes.shape({
    adult: PropTypes.bool,
    backdrop_path: PropTypes.string,
    budget: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    homepage: PropTypes.string,
    id: PropTypes.number,
    imdb_id: PropTypes.string,
    original_language: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    popularity: PropTypes.number,
    poster_path: PropTypes.string,
    production_companies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    production_countries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    release_date: PropTypes.string,
    revenue: PropTypes.number,
    runtime: PropTypes.number,
    spoken_languages: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    status: PropTypes.string,
    tagline: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.bool,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
  }),
};

Info.defaultProps = {
  movie: {},
};
