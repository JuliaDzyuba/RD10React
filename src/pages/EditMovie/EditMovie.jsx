import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import useTranslation from '../../hooks/useTranslation';
import validateForm from '../../utils/validateForm';
import { editMovie } from '../../store/slices/movie.slice';
import withAuth from '../../hoc/withAuth';
import styles from './styles.module.scss';

function EditMovie() {
  const { movieId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentMovie } = useSelector((state) => state.movieReducer);

  const { lang } = useSelector((state) => state.userReducer);
  const intl = useTranslation(lang);

  const formik = useFormik({
    initialValues: {
      title: currentMovie.title,
      backdrop_path: currentMovie.backdrop_path,
      genres: currentMovie.genres.map((g) => g.name).join(','),
      overview: currentMovie.overview,
    },
    validate: validateForm,
    onSubmit: (formValue) => {
      dispatch(editMovie({ movieId, formValue }));
      history.goBack();
    },
  });

  return (
    <div className={styles.container}>
      <h1>{intl['app-editpage']}</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">
          {intl['app-editpage-title']}
          {formik.errors.title ? <p className={styles.error}>{formik.errors.title}</p> : null}
          <input
            type="text"
            name="title"
            id="title"
            placeholder={intl['app-editpage-title-placeholder']}
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </label>
        <label htmlFor="imageUrl">
          {intl['app-editpage-image']}
          {formik.errors.backdrop_path
          && <p className={styles.error}>{formik.errors.backdrop_path}</p>}
          <input
            type="text"
            name="backdrop_path"
            id="imageUrl"
            placeholder={intl['app-editpage-image-placeholder']}
            value={formik.values.backdrop_path}
            onChange={formik.handleChange}
          />
        </label>
        <label htmlFor="genres">
          {intl['app-editpage-genres']}
          {formik.errors.genres
          && <p className={styles.error}>{formik.errors.genres}</p>}
          <input
            type="text"
            name="genres"
            id="genres"
            placeholder={intl['app-editpage-genres-placeholder']}
            value={formik.values.genres}
            onChange={formik.handleChange}
          />
        </label>
        <label htmlFor="description">
          {intl['app-editpage-description']}
          {formik.errors.overview
          && <p className={styles.error}>{formik.errors.overview}</p>}
          <textarea
            type="text"
            name="overview"
            id="description"
            placeholder={intl['app-editpage-description-placeholder']}
            value={formik.values.overview}
            onChange={formik.handleChange}
            rows={10}
          />
        </label>
        <div className={styles.buttonsGroup}>
          <button type="submit" className={styles.btn}>{intl['app-editpage-button-save']}</button>
          <Link to={`/movies/${movieId}`} className={styles.btn}>{intl['app-editpage-button-back']}</Link>
        </div>
      </form>
    </div>
  );
}

export default withAuth(EditMovie);
