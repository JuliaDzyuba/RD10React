import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { API_IMAGE_URL } from '../../constants';

function Info(props) {
  const { currentMovie: movie } = props;
  return (
    <>
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
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  currentMovie: state.movieReducer.currentMovie,
});

export default connect(mapStateToProps, null)(Info);

Info.propTypes = {
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
