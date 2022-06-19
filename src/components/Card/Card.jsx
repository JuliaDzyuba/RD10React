import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars';

import styles from './styles.module.scss';
import { API_IMAGE_URL } from '../../constants';

function Card({
  item,
  onClick,
  getLikesById,
  getRatingById,
}) {
  const [likes, setLikes] = useState(0);
  getLikesById(item.id, likes);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    getLikesById(item.id, likes);
  };

  const handleDislike = () => {
    setLikes((prev) => prev - 1);
    getLikesById(item.id, likes);
  };

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
          <span className={styles.count}>{likes}</span>
        </div>
        <div className={styles.info}>
          <h2 onClick={onClick} aria-hidden="true" id={item.id}>{item.title}</h2>
          <div className={styles.poster}>
            <img src={`${API_IMAGE_URL}${item.backdrop_path}`} alt={item.title} />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Stars getRatingById={getRatingById} movieId={item.id} />
      </div>
    </li>
  );
}

export default Card;

Card.propTypes = {
  item: PropTypes.shape({
    adult: PropTypes.bool,
    backdrop_path: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
    original_language: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    popularity: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.bool,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
  }),
  onClick: PropTypes.func.isRequired,
  getLikesById: PropTypes.func.isRequired,
  getRatingById: PropTypes.func.isRequired,
};

Card.defaultProps = {
  item: {},
};
