import React, { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../../constants';
import movieServices from '../../services/movieServices';
import Card from '../Card';
import Info from '../Info';
import styles from './styles.module.scss';

function Content() {
  const [moviesList, setMoviesList] = useState(null);
  const [currentMovieId, setCurrentMovieId] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchList, setSearchList] = useState(null);

  useEffect(() => {
    const url = `${API_URL}discover/movie?api_key=${API_KEY}`;

    movieServices.getAll(url)
      .then((data) => {
        setMoviesList(() => data);
        setSearchList(() => data);
        setCurrentMovieId(() => data[0].id);
      });
  }, []);

  useEffect(() => {
    if (currentMovieId) {
      const url = `${API_URL}/movie/${currentMovieId}?api_key=${API_KEY}`;
      movieServices.getById(url)
        .then((data) => {
          setCurrentMovie(() => data);
        });
    }
  }, [currentMovieId]);

  const getCurrentMovieId = (e) => {
    setCurrentMovieId(() => e.target.id);
  };

  const filterByLikes = () => {
    const newList = [...moviesList].sort((a, b) => b.likes - a.likes);
    setSearchList(newList);
  };

  const filterByRating = () => {
    const newList = [...moviesList].sort((a, b) => b.rating - a.rating);
    setSearchList(newList);
  };

  const getLikesById = (id, likes) => {
    const movie = moviesList.find((item) => item.id === id);
    const idx = moviesList.findIndex((item) => item.id === id);
    movie.likes = likes;
    moviesList.splice(idx, 1, movie);
  };

  const getRatingById = (id, rating) => {
    const movie = moviesList.find((item) => item.id === id);
    const idx = moviesList.findIndex((item) => item.id === id);
    movie.rating = rating;
    moviesList.splice(idx, 1, movie);
  };

  const searchByQuery = () => {
    if (searchQuery) {
      const newList = moviesList
        .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchList(() => newList);
    } else {
      setSearchList(moviesList);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.left}>
        <div className={styles.sorting}>
          <h4>Sort movies</h4>
          <button type="button" onClick={filterByLikes}>By likes</button>
          <button type="button" onClick={filterByRating}>By rating</button>
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
            searchList && searchList.map((item) => (
              <Card
                key={item.id}
                item={item}
                onClick={getCurrentMovieId}
                getLikesById={getLikesById}
                getRatingById={getRatingById}
              />
            ))
          }
        </ul>
      </div>
      <div className={styles.right}>
        {currentMovie && <Info movie={currentMovie} />}
      </div>
    </main>
  );
}

export default Content;
