import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { addLikes } from '../../store/slices/movie.slice';
import Stars from '../Stars';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Card(props) {
  const { item } = props;
  const dispatch = useDispatch();

  const [likes, setLikes] = useState(item.likes || 0);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const handleDislike = () => {
    setLikes((prev) => prev - 1);
  };

  useEffect(() => {
    dispatch(addLikes({ movieId: item.id, likes }));
  }, [likes]);

  return (
    <li className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.reactions}>
          <button type="button" className={styles.like} title="Like" onClick={handleLike}>
            &#128077;
          </button>
          <button type="button" className={styles.dislike} title="Dislike" onClick={handleDislike}>
            &#128078;
          </button>
          <span className={styles.likes}>Likes</span>
          <hr />
          <span className={cx({
            count: true,
            maxLikes: likes > 10,
          })}
          >
            {likes}
          </span>
        </div>
        <div className={styles.info}>
          <Link
            to={`/movies/${item.id}`}
            className={cx({
              title: true,
              best: likes > 10,
            })}
            aria-hidden="true"
            id={item.id}
          >
            {item.title}
          </Link>
          <div className={styles.poster}>
            <img src={`${process.env.REACT_APP_API_IMAGE_URL}${item.backdrop_path}`} alt={item.title} />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Stars movieId={item.id} stars={item.rating} />
      </div>
    </li>
  );
}

export default Card;

Card.propTypes = {
  item: PropTypes.shape({
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
    likes: PropTypes.number,
    rating: PropTypes.number,
  }).isRequired,
};
