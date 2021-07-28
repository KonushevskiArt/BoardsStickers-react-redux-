import React from 'react';
import classes from './NotFound.module.scss';
import { Link } from 'react-router-dom';

function NotFound(props) {
  console.log(classes)
  return (
    <div className={classes.NotFound}>
      <h2>404: Page not found</h2>
      <Link to="/">Back to menu</Link>
    </div>
  )
} 

export {NotFound};
