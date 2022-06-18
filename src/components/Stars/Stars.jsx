import React, { useState } from 'react';

function Stars() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="stars">
      {[...Array(5)].map((star, index) => {
        const id = index + 1;
        return (
          <button
            type="button"
            key={id}
            className={id <= (hover || rating) ? 'on' : 'off'}
            onClick={() => setRating(id)}
            onMouseEnter={() => setHover(id)}
            onMouseLeave={() => setHover(rating)}
          >
            &#9733;
          </button>
        );
      })}
    </div>
  );
}

export default Stars;
