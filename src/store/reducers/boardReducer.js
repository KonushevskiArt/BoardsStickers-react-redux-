import {createDate} from '../../utils/createDate.js';

const initialState = {
  loading: false,
  error: null,
  board: {},
}

const halfWidthSticker = 133;
const topOffsetSticker = 20;

const boardReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'FETCH_BOARD_START':
      return {
        ...state, loading: true
      };
    case 'FETCH_BOARD_SUCCESS':
      return {
        ...state, loading: false, board: action.board.data, 
      };
    case 'FETCH_BOARD_ERROR':
      return {
        ...state, loading: false, error: action.error
      };
    case 'ADD_STICKER':
      const {evt} = action;

      if (evt.target === evt.currentTarget) {
        const newSticker = {
          id: Math.floor(Math.random() * 99999) + evt.pageX + evt.pageY,
          value: '',
          isFavorite: false,
          isImportant: false,
          top: evt.pageY - topOffsetSticker,
          left: evt.pageX - halfWidthSticker,
          date: createDate(),
        }

      return {
        ...state, board: {...state.board, stickers: [...state.board.stickers, newSticker]}
      }
    }
    // case 'REMOVE_STICKER':
    //   const indexSticker = state.boards.findIndex((el) => el.name === action.name);
    //   copyBoards.splice(indexSticker, 1)
    //     return { 
    //     ...state, boards: copyBoards
    //   };
    default:
      return state;
  }
}

export {boardReducer};