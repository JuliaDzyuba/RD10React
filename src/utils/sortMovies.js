const sortMovies = (array, type = 'ASC', property) => {
  if (type === 'ASC') {
    return [...array].sort((a, b) => b[property] - a[property]);
  }
  return [...array].sort((a, b) => a[property] - b[property]);
};

export default sortMovies;
