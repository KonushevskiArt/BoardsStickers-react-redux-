import {createDate} from '../../utils/createDate.js';

// const initialState1 = {boards: [
//   {name: 'Important', date: {hours: 21, minutes: "07", day: 23, month: "06", year: 2021}, 
//     stickers: [{
//       id: 1,
//       value: 'bla bla bla',
//       isFavorite: true,
//       isImportant: false,
//       top: '650px',
//       left: '0px',
//       date: createDate(),
//       zIndex: 1
//     },
//     {
//       id: 2,
//       value: 'bla blasdfasa bla',
//       isFavorite: false,
//       isImportant: false,
//       top: '350px',
//       left: '300px',
//       date: createDate(),
//       zIndex: 2
//     },
//     {
//       id: 3,
//       value: 'badfasdfla bla bla',
//       isFavorite: false,
//       isImportant: false,
//       top: '550px',
//       left: '100px',
//       date: createDate(),
//       zIndex: 3
//     },
//   ]},
//   {name: 'Work', date: {hours: 21, minutes: "07", day: 23, month: "06", year: 2021}, stickers: [{
//     id: 1,
//     value: 'bla bla bla',
//     isFavorite: false,
//     isImportant: false,
//     top: '150px',
//     left: '400px',
//     date: createDate(),
//     zIndex: 1
//   }]},
//   {name: 'Holiday', date: {hours: 21, minutes: "07", day: 23, month: "06", year: 2021}, stickers: [{
//     id: 1,
//     value: 'bla bla bla',
//     isFavorite: true,
//     isImportant: false,
//     top: '250px',
//     left: '250px',
//     date: createDate(),
//     zIndex: 2
//   }]},
//   {name: 'Home', date: {hours: 21, minutes: "07", day: 23, month: "06", year: 2021}, stickers: [{
//     id: 1,
//     value: 'bla bla bla',
//     isFavorite: true,
//     isImportant: false,
//     top: '450px',
//     left: '100px',
//     date: createDate(),
//     zIndex: 3
//   }]},
// ], loading: true};

const initialState = {
  boards: [],
  loading: false,
  error: null
}

const boardsReducer = (state = initialState, action) => {
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
    case 'ADD-BOARD':
      const newBoard = {name: action.name, date: createDate(), stickers: []};
      return {
        ...state, boards: [...copyBoards, newBoard]
      }

    case 'REMOVE-BOARD':
       const index = state.boards.findIndex((el) => el.name === action.name);
      copyBoards.splice(index, 1)
       return {
        ...state, boards: copyBoards
      };
    default:
      return state;
  }
}

export {boardsReducer};