import {createDate} from '../../utils/createDate.js';

const initialState = {
  loading: false,
  error: null,
  board: {},
  optionsMovedSticker: {
    movedSticker: null,
    movedStickerInState: null,
    shiftY: 0,
    shiftX: 0,
  },
}

const halfWidthSticker = 133;
const topOffsetSticker = 20;

const boardReducer = (state = initialState, action) => {
  let copyStickers = [];
  let currentSticker = null;
  let index = null;
  
  const evt = action.evt;
  const movedStickerClass = action.movedStickerClass;
  let {movedSticker, shiftX, shiftY, movedStickerInState} = state.optionsMovedSticker;

  if (state.board.stickers) {
    copyStickers = [...state.board.stickers];
  }

  if (action.evt && evt.currentTarget.closest('.sticker')) {
    currentSticker = evt.currentTarget.closest('.sticker');
  } else if (action.evt && evt.target.closest('.sticker')) {
    currentSticker = evt.target.closest('.sticker');
  }

  if (currentSticker) {
    index = copyStickers.findIndex((el) => el.id === Number(currentSticker.dataset.id))
  }

  const handlerMouseMove = (e) => {
    movedSticker.style.top = e.clientY - shiftY + 'px';
    movedSticker.style.left = e.clientX - shiftX + 'px';
  }
 
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
          ...state, board: {...state.board, stickers: [...copyStickers, newSticker]}
        }
      } 
      return state;
    case 'REMOVE_STICKER':
      copyStickers.splice(index, 1);
      return { 
        ...state, board: {...state.board, stickers: copyStickers}
      };
    case 'CHANGE_STICKER_VALUE':
      copyStickers[index].value = action.value;
      return { 
        ...state, board: {...state.board, stickers: copyStickers}
      };
    case 'CHANGE_STICKER_IMPORTANT':
      copyStickers[index].isImportant = !copyStickers[index].isImportant;
      return { 
        ...state, board: {...state.board, stickers: copyStickers}
      };  
    case 'CHANGE_STICKER_FAVORITE':
      copyStickers[index].isFavorite = !copyStickers[index].isFavorite;
      return { 
        ...state, board: {...state.board, stickers: copyStickers}
      };
    case 'DRAG_STICKER':
      movedSticker = currentSticker;
      if (movedSticker 
        && evt.target.closest('[data-id="favorite"]') === null
        && evt.target.closest('[data-id="important"]') === null
        && evt.target.closest('[data-id="close"]') === null) {
          // evt.currentTarget.appendChild(movedSticker);
          ///////z-index
      if (evt.target.tagName !== 'TEXTAREA') {
        evt.currentTarget.onmousemove = handlerMouseMove;
        shiftY = evt.clientY - movedSticker.offsetTop;
        shiftX = evt.clientX - movedSticker.offsetLeft;
        movedSticker.style.cursor = 'move';
        movedSticker.classList.add(movedStickerClass);
      }
    }

      return { 
        ...state,  optionsMovedSticker: {
          movedSticker,
          shiftY,
          shiftX,
        }
      };
    case 'DROP_STICKER':
      
      if (movedSticker) {
        evt.currentTarget.onmousemove = null;
 
        movedSticker.style.cursor = 'default';
        movedSticker.classList.remove(movedStickerClass);
        index = copyStickers.findIndex((el) => el.id === Number(movedSticker.dataset.id));
        let movedStickerInState = {...copyStickers[index]};
        movedStickerInState.top = movedSticker.style.top;
        movedStickerInState.left = movedSticker.style.left;
        copyStickers.splice(index, 1, movedStickerInState);
        movedSticker = null;
        movedStickerInState= null;
      }
      return { 
        ...state,  
        optionsMovedSticker: {
          movedSticker,
          movedStickerInState,
          shiftY,
          shiftX,
        },
        board: {...state.board, stickers: [...copyStickers]},
      };

    default:
      return state;
  }
}

export {boardReducer};