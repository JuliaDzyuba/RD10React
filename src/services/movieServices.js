class MovieServices {
  async getAll() {
    const url = `${process.env.REACT_APP_API_URL}discover/movie?api_key=${process.env.REACT_APP_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      return error;
    }
  }

  async getActorById(actorId) {
    const url = `${process.env.REACT_APP_API_URL}person/${actorId}?api_key=${process.env.REACT_APP_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async getDetailById(movieId) {
    const url = `${process.env.REACT_APP_API_URL}movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async getCastById(movieId) {
    const castUrl = `${process.env.REACT_APP_API_URL}movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
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
