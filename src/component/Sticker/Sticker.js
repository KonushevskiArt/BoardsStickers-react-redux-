import React, { useState } from 'react';
import classes from './Sticker.module.scss';
import {StickerOptions} from '../StickerOptions/StickerOptions.js'; 
import {StickerData} from '../StickerData/StickerData.js';

function Sticker(props) {
  const {id, value, isFavorite, isImportant, top, left, date, zIndex} = props.options;

  const [areaValue, setValue] = useState(value);
  const [isStateFavorite, setStateFavorite] = useState(isFavorite);
  const [isStateImportant, setStateImportant] = useState(isImportant);

  
  const position = {
    top,
    left,
    zIndex 
  }
  
  // class
  const cls = [classes.Sticker, 'sticker'];

  if (isStateImportant) {
    cls.push(classes.important);
  }
  if (isStateFavorite) {
    cls.push(classes.favorite);
  }
  // /class

  const handlerClickImportant = (e) => {
    props.handlerClickImportant(e)
    setStateImportant(!isStateImportant);
  }

  const handlerClickFavorite = (e) => {
    props.handlerClickFavorite(e)
    setStateFavorite(!isStateFavorite);
  }

  const handleOnChange = (e) => {
    setValue(e.target.value);
    props.handlerChangeStickerArea(e, areaValue);
  }

  const sticker = (
    <div className={cls.join(' ')} style={position} data-id={id}>
      <StickerOptions 
        isFavorite={isFavorite}
        isImportant={isImportant}
        handlerClickImportant={handlerClickImportant}
        handlerClickFavorite={handlerClickFavorite}
        handlerClickClose={props.handlerClickClose}
      />
      <textarea className={classes.stickerText} name="text" placeholder="write here" onChange={(e) => handleOnChange(e)} value={areaValue}></textarea>
      
      <StickerData date={date}/>
    </div>
  )

  return sticker;
} 

export {Sticker};
