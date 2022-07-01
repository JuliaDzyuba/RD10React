import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

function NotFound() {
  return (
    <div className={styles.container}>
      <img src="https://thumbs.dreamstime.com/b/error-page-not-found-glitch-effect-style-vector-distorted-horizontal-glitched-lines-neon-glowing-typography-dark-203421762.jpg" alt="404 error" />
      <Link to="/">Go to main page</Link>
    </div>
  );
}

export default NotFound;
