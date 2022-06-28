import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRating } from '../../store/actions/actions';

function Stars(props) {
  const { movieId, stars } = props;
  const [rating, setRating] = useState(stars || 0);

  const ratingHandler = (e) => {
    const rate = +e.target.dataset.id;
    setRating(() => rate);
  };

  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    props.addRating(movieId, rating);
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

const mapDispatchToProps = {
  addRating,
};

export default connect(null, mapDispatchToProps)(Stars);

Stars.propTypes = {
  movieId: PropTypes.number.isRequired,
  stars: PropTypes.number,
  addRating: PropTypes.func.isRequired,
};

Stars.defaultProps = {
  stars: 0 || undefined,
};
