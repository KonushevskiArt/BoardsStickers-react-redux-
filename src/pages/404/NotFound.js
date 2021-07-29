import React from 'react';
import classes from './NotFound.module.scss';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className={classes.NotFound}>
      <h2>404: Page not found</h2>
      <Link to="/">Back to menu</Link>
    </div>
  )
} 

export {NotFound};
