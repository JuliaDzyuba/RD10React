import { API_KEY, API_URL } from '../constants';

class MovieServices {
  async getAll() {
    const url = `${process.env.API_URL}discover/movie?api_key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      return error;
    }
  }

  async getActorById(actorId) {
    const url = `${API_URL}/person/${actorId}?api_key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async getDetailById(movieId) {
    const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async getCastById(movieId) {
    const castUrl = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    try {
      const response = await fetch(castUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
}

const movieServices = new MovieServices();
export default movieServices;
