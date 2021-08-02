import React, { useState } from 'react';
import classes from './Sticker.module.scss';
import StickerOptions from '../StickerOptions/StickerOptions.js'; 
import {StickerData} from '../StickerData/StickerData.js';
import { connect } from 'react-redux';
import { changeStickerValue } from '../../store/actions/board';

function Sticker(props) {
  const {id, value, isFavorite, isImportant, top, left, date} = props.options;

  const [areaValue, setValue] = useState(value);
  
  const position = {
    top,
    left,
  }
  
  // class
  const cls = [classes.Sticker, 'sticker'];

  if (isImportant) {
    cls.push(classes.important);
  }
  if (isFavorite) {
    cls.push(classes.favorite);
  }
  // /class

  const handleOnChange = (e) => {
    setValue(e.target.value);
  }

  const sticker = (
    <div className={cls.join(' ')} style={position} data-id={id}>
      <StickerOptions 
        isFavorite={isFavorite}
        isImportant={isImportant}
      />
      <textarea 
        className={classes.stickerText} 
        name="text" 
        placeholder="write here" 
        onChange={(e) => handleOnChange(e)} 
        onBlur={(e) => props.changeStickerValue(e, areaValue)}
        value={areaValue}>
      </textarea>
      
      <StickerData date={date}/>
    </div>
  )

  return sticker;
} 
const mapStateToProps = (state) => {
  return {
    'data': state.board
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeStickerValue: (e, value) => dispatch(changeStickerValue(e, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sticker);
