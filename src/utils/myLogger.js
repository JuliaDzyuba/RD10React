/* eslint-disable no-console */
const myLogger = (state) => (next) => (action) => {
  console.log('%c PREV STATE', 'color: #cccccc; font-weight: bold', state.getState());
  console.log('%c ACTION', 'color: red; font-weight: bold', action);
  next(action);
  console.log('%c NEXT STATE', 'color: blue; font-weight: bold', state.getState());
  console.log('====================================');
};

export default myLogger;
