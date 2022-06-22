class MovieServices {
  // eslint-disable-next-line class-methods-use-this
  async getAll(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      return error;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getById(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
}

const movieServices = new MovieServices();
export default movieServices;
