import React from 'react';
import classes from './StickerData.module.scss';

function StickerData(props) {

  const {hours, minutes, day, month, year} = props.date;

  return (
    <div className={classes.wrapperDate}>
        <div className={classes.time}>
          <span id="hours">{hours}</span>:<span id="minuts">{minutes}</span>
        </div>
        <div className={classes.date}>
          <span id="day">{day}.</span>
          <span id="month">{month}.</span>
          <span id="year">{year}</span>
        </div>
      </div>
  )
} 

export {StickerData};
