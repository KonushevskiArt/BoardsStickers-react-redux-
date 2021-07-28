import React from 'react';
import classes from './StickerOptions.module.scss';

function StickerOptions(props) {
  const {
    isFavorite,
    isImportant,
    handlerClickImportant,
    handlerClickFavorite,
    handlerClickClose,
  } = props;

  return (
    <div className={classes.StickerOptions}>
        <div className={classes.StickerOptionsLeftwrap}>
          <div onClick={(e) => handlerClickFavorite(e)} title="click to make your notice favorite"><svg height="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className={isFavorite ? classes.heartActive : classes.heart} role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg></div>
          <div onClick={(e) => handlerClickImportant(e)} title="click to make your notice important"><svg height="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className={isImportant ? classes.starActive : classes.star} role="img" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg></div>
        </div>          
          <div 
            title="hold down the left mouse button to move the window" className={classes.pin}><svg height='20' aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbtack"  role="img" viewBox="0 0 384 512"><path fill="currentColor" d="M298.028 214.267L285.793 96H328c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v48c0 13.255 10.745 24 24 24h42.207L85.972 214.267C37.465 236.82 0 277.261 0 328c0 13.255 10.745 24 24 24h136v104.007c0 1.242.289 2.467.845 3.578l24 48c2.941 5.882 11.364 5.893 14.311 0l24-48a8.008 8.008 0 0 0 .845-3.578V352h136c13.255 0 24-10.745 24-24-.001-51.183-37.983-91.42-85.973-113.733z"></path></svg></div>
          <div onClick={(e) => handlerClickClose(e)} className={classes.close}><svg height='20' aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"  role="img" viewBox="0 0 352 512"><path  fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></div>
      </div>
  )
} 

export {StickerOptions};
