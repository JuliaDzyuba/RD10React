const validateForm = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'This field is required';
  } else if (values.title.length < 3 || values.title.length > 50) {
    errors.title = 'The title must be at least 3 characters but less then 30 characters';
  }

  if (!values.backdrop_path) {
    errors.backdrop_path = 'This field is required. Example: /filename.jpeg';
  } else if (!/^\/([a-zA-Z-_0-9]*)\.(gif|png|jpeg|jpg)$/gm.test(values.backdrop_path)) {
    errors.backdrop_path = 'The path must have one of the following extensions: .gif, .jpeg, .jpg, .png';
  }

  if (!values.genres) {
    errors.genres = 'This field is required';
  } else if (values.genres.length < 3) {
    errors.genres = 'The title must be at least 3 characters';
  }

  if (!values.overview) {
    errors.overview = 'This field is required';
  } else if (values.overview.length < 20) {
    errors.overview = 'The title must be at least 20 characters';
  }

  return errors;
};

export default validateForm;
