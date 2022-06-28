import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { API_KEY, API_URL } from '../../constants';
import movieServices from '../../services/movieServices';
import { setMoviesListToStore, setCurrentMovie } from '../../store/actions/actions';
import Card from '../Card';
import Info from '../Info';
import styles from './styles.module.scss';

function Content(props) {
  const { movies } = props;

  const [currentMovieId, setCurrentMovieId] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [sortingType, setSortingType] = useState('');

  useEffect(() => {
    const url = `${API_URL}discover/movie?api_key=${API_KEY}`;

    movieServices.getAll(url)
      .then((data) => {
        if (data.length) {
          setCurrentMovieId(data[0].id);
          // eslint-disable-next-line react/destructuring-assignment
          props.setMoviesListToStore(data);
          setSearchList(data);
        }
      });
  }, []);

  useEffect(() => {
    if (currentMovieId) {
      const url = `${API_URL}/movie/${currentMovieId}?api_key=${API_KEY}`;
      movieServices.getById(url)
        .then((data) => {
          if (data) {
            // eslint-disable-next-line react/destructuring-assignment
            props.setCurrentMovie(data);
          }
        });
    }
  }, [currentMovieId]);

  const getCurrentMovieId = (e) => {
    setCurrentMovieId(e.target.id);
  };

  const sortingByLikes = (e) => {
    if (e.target.value === 'ASC') {
      const newList = [...searchList].sort((a, b) => b.likes - a.likes);
      setSearchList(newList);
      setSortingType(e.target.value);
    }
    if (e.target.value === 'DESC') {
      const newList = [...searchList].sort((a, b) => a.likes - b.likes);
      setSearchList(newList);
      setSortingType(e.target.value);
    }
    if (!e.target.value) {
      setSearchList(movies);
      setSortingType('');
    }
  };

  const sortingByRating = (e) => {
    if (e.target.value === 'ASC') {
      const newList = [...searchList].sort((a, b) => b.rating - a.rating);
      setSearchList(newList);
      setSortingType(e.target.value);
    }
    if (e.target.value === 'DESC') {
      const newList = [...searchList].sort((a, b) => a.rating - b.rating);
      setSearchList(newList);
      setSortingType(e.target.value);
    }
    if (!e.target.value) {
      setSearchList(movies);
      setSortingType('');
    }
  };

  const searchByQuery = () => {
    if (searchQuery) {
      const newList = movies
        .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchList(newList);
    } else {
      setSearchList(movies);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.left}>
        <div className={styles.sorting}>
          <h4>Sort movies</h4>
          <label htmlFor="likesSorting">
            Sort by likes
            <select defaultValue={sortingType} onChange={sortingByLikes} id="likesSorting">
              <option value="">Sort by</option>
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </label>
          <label htmlFor="ratingSorting">
            Sort by likes
            <select defaultValue={sortingType} onChange={sortingByRating} id="ratingSorting">
              <option value="">Sort by</option>
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </label>
          <div className={styles.searchForm}>
            <button type="button" onClick={searchByQuery}>
              <span className="visually-hidden">Search</span>
            </button>
            <input
              className={styles.search}
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <ul className={styles.list}>
          {
            searchList.length
              ? searchList.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  onClick={getCurrentMovieId}
                />
              ))
              : 'Oops! There is nothing here.'
          }
        </ul>
      </div>
      <div className={styles.right}>
        {currentMovieId ? <Info /> : 'Oops! There is nothing here.'}
      </div>
    </main>
  );
}

const mapStateToProps = (state) => ({
  movies: state.movieReducer.moviesList,
});

const mapDispatchToProps = {
  setMoviesListToStore,
  setCurrentMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);

Content.propTypes = {
  setMoviesListToStore: PropTypes.func.isRequired,
  setCurrentMovie: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
};
