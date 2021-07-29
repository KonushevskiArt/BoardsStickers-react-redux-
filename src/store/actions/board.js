import axios from '../../axios/axios-boards.js';
import {FETCH_BOARD_START} from './actionTypes.js';
import {FETCH_BOARD_SUCCESS} from './actionTypes.js';
import {FETCH_BOARD_ERROR} from './actionTypes.js';
import {ADD_STICKER} from './actionTypes.js';
import {REMOVE_STICKER} from './actionTypes.js';

export function addSticker(evt) {
  return {
    type: ADD_STICKER, 
    evt
  }
} 

export function removeSticker(name) {
  return {
    type: REMOVE_STICKER,
    name
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

