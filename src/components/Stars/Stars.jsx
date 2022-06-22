import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Stars({ setRatingById, movieId, stars = 0 }) {
  const [rating, setRating] = useState(stars || 0);

  const ratingHandler = (e) => {
    const rate = +e.target.dataset.id;
    setRating(() => rate);
  };

  useEffect(() => {
    setRatingById(movieId, rating);
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
            className={ratingId <= rating ? 'on' : 'off'}
            onClick={ratingHandler}
          >
            &#9733;
          </button>
        );
      })}
    </div>
  );
}

Stars.propTypes = {
  movieId: PropTypes.number.isRequired,
  stars: PropTypes.number,
  setRatingById: PropTypes.func.isRequired,
};

Stars.defaultProps = {
  stars: 0 || undefined,
};

export default Stars;
