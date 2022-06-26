import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

function EditMovie(props) {
  const { movieId } = useParams();

  const [formValue, setFormValue] = useState({
    title: props.currentMovie.title || '',
    backdrop_path: props.currentMovie.backdrop_path || '',
    genres: props.currentMovie.genres.map((g) => g.name).join(', ') || '',
    overview: props.currentMovie.overview || '',
  });

  const handleSubmit = (e) => {
    e.prevent.default();
  };

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
  };

  return (
    <div className={styles.container}>
      <h1>Edit Movie</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title..."
            value={formValue.title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="imageUrl">
          Image URL
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder="Enter imageUrl..."
            value={formValue.backdrop_path}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="genres">
          Genres
          <input
            type="text"
            name="genres"
            id="genres"
            placeholder="Enter genres..."
            value={formValue.genres}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Enter description..."
            value={formValue.overview}
            onChange={handleChange}
            rows={10}
          />
        </label>
        <div className={styles.buttonsGroup}>
          <button type="button" className={styles.btn} onClick={handleClick}>Save</button>
          <Link to={`/movies/${movieId}`} className={styles.btn}>Go back</Link>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentMovie: state.movieReducer.currentMovie,
  movies: state.movieReducer.moviesList,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(EditMovie);

EditMovie.propTypes = {
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
  }).isRequired,
};
