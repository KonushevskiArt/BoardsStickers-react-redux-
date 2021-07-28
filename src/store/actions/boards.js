import axios from '../../axios/axios-boards.js';
import {FETCH_BOARDS_START} from './actionTypes.js';
import {FETCH_BOARDS_SUCCESS} from './actionTypes.js';
import {FETCH_BOARDS_ERROR} from './actionTypes.js';

export function fetchBoards() {

  return async dispatch => {
    dispatch(fetchBoardsStart())
    try {
      const response= await axios.get('artem.json')
      
      const boards = response.data.boards;

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