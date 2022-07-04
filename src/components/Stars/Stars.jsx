import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { addRating } from '../../store/slices/movie.slice';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Stars(props) {
  const { movieId, stars } = props;
  const [rating, setRating] = useState(stars || 0);
  const dispatch = useDispatch();

  const ratingHandler = (e) => {
    const rate = +e.target.dataset.id;
    setRating(() => rate);
  };

  useEffect(() => {
    dispatch(addRating({ movieId, rating }));
  }, [rating]);

  return (
    <div className="stars">
      {[...Array(5)].map((star, index) => {
        const ratingId = index + 1;
        return (
          <button
            type="button"
            key={ratingId}
            data-id={ratingId}
            className={cx({
              on: ratingId <= rating,
              off: ratingId > rating,
            })}
            onClick={ratingHandler}
          >
            &#9733;
          </button>
        );
      })}
    </div>
  );
}

export default Stars;

Stars.propTypes = {
  movieId: PropTypes.number.isRequired,
  stars: PropTypes.number,
};

Stars.defaultProps = {
  stars: 0 || undefined,
};
