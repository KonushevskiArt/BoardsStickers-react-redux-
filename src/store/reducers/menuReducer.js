import {createDate} from '../../utils/createDate.js';

const initialState = {
  boards: [],
  loading: false,
  error: null,
  board: {},
}

const menuReducer = (state = initialState, action) => {

  const copyBoards = [...state.boards];

  switch (action.type) {
    case 'FETCH_BOARDS_START':
      return {
        ...state, loading: true
      };
    case 'FETCH_BOARDS_SUCCESS':
      return {
        ...state, loading: false, boards: action.boards, 
      };
    case 'FETCH_BOARDS_ERROR':
      return {
        ...state, loading: false, error: action.error
      };
    case 'ADD_BOARD':
      const newBoard = {id: action.name + Math.floor( Math.random() * 100000), name: action.name, date: createDate(), stickers: []};
      return {
        ...state, boards: [...copyBoards, newBoard]
      }
    case 'REMOVE_BOARD':
      const indexBoard = state.boards.findIndex((el) => el.id === action.id);
      copyBoards.splice(indexBoard, 1)
      return { 
        ...state, boards: copyBoards
      };
    default:
      return state;
  }
}

export {menuReducer};