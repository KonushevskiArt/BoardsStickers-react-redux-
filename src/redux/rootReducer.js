import {createDate} from '../utils/createDate.js';

const initialState = {boards: [
  {name: 'Important', date: {hours: 21, minutes: "07", day: 23, month: "06", year: 2021}, 
    stickers: [{
      id: 1,
      value: 'bla bla bla',
      isFavorite: true,
      isImportant: false,
      top: '650px',
      left: '0px',
      date: createDate(),
      zIndex: 1
    },
    {
      id: 2,
      value: 'bla blasdfasa bla',
      isFavorite: false,
      isImportant: false,
      top: '350px',
      left: '300px',
      date: createDate(),
      zIndex: 2
    },
    {
      id: 3,
      value: 'badfasdfla bla bla',
      isFavorite: false,
      isImportant: false,
      top: '550px',
      left: '100px',
      date: createDate(),
      zIndex: 3
    },
  ]},
  {name: 'Work', date: {hours: 21, minutes: "07", day: 23, month: "06", year: 2021}, stickers: [{
    id: 1,
    value: 'bla bla bla',
    isFavorite: false,
    isImportant: false,
    top: '150px',
    left: '400px',
    date: createDate(),
    zIndex: 1
  }]},
  {name: 'Holiday', date: {hours: 21, minutes: "07", day: 23, month: "06", year: 2021}, stickers: [{
    id: 1,
    value: 'bla bla bla',
    isFavorite: true,
    isImportant: false,
    top: '250px',
    left: '250px',
    date: createDate(),
    zIndex: 2
  }]},
  {name: 'Home', date: {hours: 21, minutes: "07", day: 23, month: "06", year: 2021}, stickers: [{
    id: 1,
    value: 'bla bla bla',
    isFavorite: true,
    isImportant: false,
    top: '450px',
    left: '100px',
    date: createDate(),
    zIndex: 3
  }]},
]};

const rootReducer = (state = initialState, action) => {
  // console.log(state)
  const copyState = {...state};

  switch (action.type) {
    case 'ADD-BOARD':
      const newBoard = {name: action.name, date: createDate(), stickers: []}  
      copyState.boards.push(newBoard)
      // console.log(copyState)
      return copyState;
    case 'REMOVE-BOARD':
      const index = copyState.boards.findIndex((el) => el.name === action.name);
      copyState.boards.splice(index, 1);
      // console.log(copyState)
      return copyState;
    default:
      return state;
  }
}

export {rootReducer};