import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMoviesListToStore } from '../../store/actions/actions';
import Card from '../Card';
import styles from './styles.module.scss';
import sortMovies from '../../utils/sortMovies';

function Content(props) {
  const { movies } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const [renderList, setRenderList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [sortingType, setSortingType] = useState('');

  useEffect(() => {
    setRenderList(movies);
    setSortedList(movies);
  }, []);

  const sortingByLikes = (e) => {
    setSortingType(e.target.value);
    if (e.target.value) {
      if (searchList.length) {
        const newList = sortMovies(searchList, e.target.value, 'likes');
        setSearchList(newList);
        setSortedList(newList);
        setRenderList(newList);
      } else {
        const newList = sortMovies(movies, e.target.value, 'likes');
        setSortedList(newList);
        setRenderList(newList);
      }
    }
    if (!e.target.value) {
      setSortingType('');
      setSortedList(movies);
      setRenderList(movies);
    }
  };

  const sortingByRating = (e) => {
    setSortingType(e.target.value);
    if (e.target.value) {
      if (searchList.length) {
        const newList = sortMovies(searchList, e.target.value, 'rating');
        setSearchList(newList);
        setSortedList(newList);
        setRenderList(newList);
      } else {
        const newList = sortMovies(movies, e.target.value, 'rating');
        setSortedList(newList);
        setRenderList(newList);
      }
    }
    if (!e.target.value) {
      if (searchList.length) {
        setRenderList(searchList);
      }
      setSortedList(movies);
      setRenderList(movies);
    }
  };

  const searchByQuery = () => {
    if (searchQuery) {
      if (sortingType) {
        const newList = sortedList
          .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchList(newList);
        setRenderList(newList);
      } else {
        const newList = renderList
          .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchList(newList);
        setRenderList(newList);
      }
    } else {
      setSearchQuery('');
      if (sortingType) {
        setRenderList(sortedList);
        setSearchList([]);
      } else {
        setRenderList(movies);
        setSearchList([]);
      }
    }
  };

  return (
    <main className={styles.container}>
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
          renderList.length
            ? renderList.map((item) => (
              <Card
                key={item.id}
                item={item}
              />
            ))
            : 'Oops! There is nothing here.'
        }
      </ul>
    </main>
  );
}

const mapStateToProps = (state) => ({
  movies: state.movieReducer.moviesList,
});

const mapDispatchToProps = {
  setMoviesListToStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);

Content.propTypes = {
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
