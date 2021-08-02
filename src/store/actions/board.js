import axios from '../../axios/axios-boards.js';
import {
  FETCH_BOARD_START,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_ERROR,
  ADD_STICKER,
  REMOVE_STICKER,
  CHANGE_STICKER_VALUE,
  CHANGE_STICKER_IMPORTANT,
  CHANGE_STICKER_FAVORITE,
  DRAG_STICKER,
  DROP_STICKER,
} from './actionTypes.js';


export function addSticker(evt) {
  return {
    type: ADD_STICKER, 
    evt
  }
} 

export function removeSticker(evt) {
  return {
    type: REMOVE_STICKER,
    evt
  }
}  

export function fetchBoard(id) {

  return async dispatch => {
    dispatch(fetchBoardStart());
    try {
      const response= await axios.get(`artem/boards${id}.json`);
      dispatch(fetchBoardSuccess(response))
    } catch (error) {
      dispatch(fetchBoardError(error))
    }
  }
}

export function fetchBoardStart() {
  return {
    type: FETCH_BOARD_START
  }
} 
export function fetchBoardSuccess(board) {
  return {
    type: FETCH_BOARD_SUCCESS,
    board
  }
}
export function fetchBoardError(error) {
  return {
    type: FETCH_BOARD_ERROR,
    error
  }
} 
export function changeStickerValue(evt, value) {
  return {
    type: CHANGE_STICKER_VALUE,
    evt,
    value
  }
}
export function changeStickerImportant(evt) {
  return {
    type: CHANGE_STICKER_IMPORTANT,
    evt
  }
}
export function changeStickerFavorite(evt) {
  return {
    type: CHANGE_STICKER_FAVORITE,
    evt
  }
}
export function dragSticker(evt, movedStickerClass) {
  return {
    type: DRAG_STICKER,
    evt,
    movedStickerClass
  }
}
export function dropSticker(evt, movedStickerClass) {
  return {
    type: DROP_STICKER,
    evt,
    movedStickerClass
  }
}

