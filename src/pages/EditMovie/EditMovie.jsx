import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { editMovie } from '../../store/slices/movie.slice';
import styles from './styles.module.scss';

function EditMovie() {
  const { movieId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentMovie } = useSelector((state) => state.movieReducer);

  const [formValue, setFormValue] = useState({
    title: currentMovie.title,
    backdrop_path: currentMovie.backdrop_path,
    genres: currentMovie.genres.map((g) => g.name).join(','),
    overview: currentMovie.overview,
  });

  const handleSubmit = (e) => {
    e.prevent.default();
  };

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    dispatch(editMovie({ movieId, formValue }));
    history.goBack();
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
            name="backdrop_path"
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
            name="overview"
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

export default EditMovie;
