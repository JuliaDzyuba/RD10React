import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import { editMovie } from '../../store/slices/movie.slice';
import styles from './styles.module.scss';

function EditMovie() {
  const { movieId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentMovie } = useSelector((state) => state.movieReducer);

  const { lang } = useSelector((state) => state.userReducer);
  const intl = useTranslation(lang);

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
      <h1>{intl['app-editpage']}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          {intl['app-editpage-title']}
          <input
            type="text"
            name="title"
            id="title"
            placeholder={intl['app-editpage-title-placeholder']}
            value={formValue.title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="imageUrl">
          {intl['app-editpage-image']}
          <input
            type="text"
            name="backdrop_path"
            id="imageUrl"
            placeholder={intl['app-editpage-image-placeholder']}
            value={formValue.backdrop_path}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="genres">
          {intl['app-editpage-genres']}
          <input
            type="text"
            name="genres"
            id="genres"
            placeholder={intl['app-editpage-genres-placeholder']}
            value={formValue.genres}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          {intl['app-editpage-description']}
          <textarea
            type="text"
            name="overview"
            id="description"
            placeholder={intl['app-editpage-description-placeholder']}
            value={formValue.overview}
            onChange={handleChange}
            rows={10}
          />
        </label>
        <div className={styles.buttonsGroup}>
          <button type="button" className={styles.btn} onClick={handleClick}>{intl['app-editpage-button-save']}</button>
          <Link to={`/movies/${movieId}`} className={styles.btn}>{intl['app-editpage-button-back']}</Link>
        </div>
      </form>
    </div>
  );
}

export default EditMovie;
