import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Stars({ getRatingById, movieId }) {
  const [rating, setRating] = useState(0);

  getRatingById(movieId, rating);

  const ratingHandler = (e) => {
    const rate = e.target.dataset.id;
    setRating(rate);
    getRatingById(movieId, rating);
  };

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
  getRatingById: PropTypes.func.isRequired,
};

export default Stars;
