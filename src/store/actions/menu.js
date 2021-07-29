import axios from '../../axios/axios-boards.js';
import {FETCH_BOARDS_START} from './actionTypes.js';
import {FETCH_BOARDS_SUCCESS} from './actionTypes.js';
import {FETCH_BOARDS_ERROR} from './actionTypes.js';
import {ADD_BOARD} from './actionTypes.js';
import {REMOVE_BOARD} from './actionTypes.js';

export function fetchBoards() {

  return async dispatch => {
    dispatch(fetchBoardsStart())
    try {
      const response= await axios.get('artem.json')

      const res = [];
      for (let board in response.data.boards) {
        res.push(response.data.boards[board])
      }

      const boards = res;

      dispatch(fetchBoardsSuccess(boards))
    } catch (error) {
      dispatch(fetchBoardsError(error))
    }
  }
}

export function fetchBoardsStart() {
  return {
    type: FETCH_BOARDS_START
  }
} 
export function fetchBoardsSuccess(boards) {
  return {
    type: FETCH_BOARDS_SUCCESS,
    boards
  }
}
export function fetchBoardsError(error) {
  return {
    type: FETCH_BOARDS_ERROR,
    error
  }
} 
export function addBoard(name) {
  return {
    type: ADD_BOARD, 
    name
  }
} 

export function removeBoard(id) {
  return {
    type: REMOVE_BOARD,
    id
  }
}  
