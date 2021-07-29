import React, { useState, useEffect } from 'react';
import classes from './Board.module.scss';
import {Sticker} from '../../component/Sticker/Sticker.js';
// import {createDate} from '../../utils/createDate.js';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'; 
import {addSticker, fetchBoard} from '../../store/actions/board.js';
import {Spinner} from '../../component/Spinner/Spinner.js';

let currentZindex = 10;
//при перемещении перемещать элемент в конец родителя apendChild вместо Zindex

function Board(props) {

  const loading = props.loading;
  const board = props.data.board;
  
  const [stickers, setStickers] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    props.fetchBoard(props.match.path);
  }, []);
  
  useEffect(()=> {
    if (board.stickers) {
      setStickers(board.stickers)
      setName(board.name)
    }
  }, [props])


  const [isShowList, setShowList] = useState(false);

  let movedSticker = null,
      movedStickerInState = null,
      shiftX,
      shiftY;

  const findClickedSticker = (e, stickers) => {
    const currentSticker = e.currentTarget.closest('.sticker');
    return stickers.filter((el) => el.id === Number(currentSticker.dataset.id))[0];
  }

  const handlerClickImportant = (e) => {
    const currentStickerInState = findClickedSticker(e, stickers);
    currentStickerInState.isImportant = !currentStickerInState.isImportant;
  } 

  const handlerClickFavorite = (e) => {
    const currentStickerInState = findClickedSticker(e, stickers);
    currentStickerInState.isFavorite = !currentStickerInState.isFavorite;
  }

  const handlerClickClose = (e) => {
    const currentStickerInState = findClickedSticker(e, stickers);
    const copyStickers = stickers.slice()
    const index = stickers.findIndex((el) => el.id === Number(currentStickerInState.id))
    copyStickers.splice(index, 1);
    // setStickers(copyStickers);
  }

  const handlerChangeStickerArea = (e, value) => {
    const currentStickerInState = findClickedSticker(e, stickers);
    currentStickerInState.value = value;
  }

  const handlerMouseDown = (e) => {
    movedSticker = e.target.closest('.sticker');
    if (movedSticker) {
      movedStickerInState = stickers.filter((el) => el.id === Number(movedSticker.dataset.id))[0];
      movedSticker.style.zIndex = currentZindex += 1;
      movedStickerInState.zIndex = currentZindex;
      if (e.target.tagName !== 'TEXTAREA') {
        e.currentTarget.addEventListener('mousemove', handlerMouseMove);
        shiftY = e.clientY - movedSticker.offsetTop;
        shiftX = e.clientX - movedSticker.offsetLeft;
        movedSticker.style.cursor = 'move';
        movedSticker.classList.add(classes.moveSticker);
      }
    }
  }

  const handlerMouseUp = (e) => {
    if (movedSticker) {
      e.currentTarget.removeEventListener('mousemove', handlerMouseMove);
      movedSticker.style.cursor = 'default';
      movedSticker.classList.remove(classes.moveSticker);
      movedSticker = null;
      movedStickerInState= null;
    }
  }

  const handlerMouseMove = (e) => {
    movedStickerInState.top = movedSticker.style.top = e.clientY - shiftY + 'px';
    movedStickerInState.left = movedSticker.style.left = e.clientX - shiftX + 'px';
  }

  const menuList = () => {
    return (
      <ul className={classes.menuList}>
        <li>
          <Link to="/">Back to menu</Link>
        </li>
      </ul>
    ) 
  }
  const toggleList = () => {
    setShowList(!isShowList);
  }
  const menu = () => {
    return (
      <div className={classes.wrapperMenu}>
        <button className={classes.menu} onClick={toggleList}>
          <svg enableBackground="new 0 0 515.555 515.555" height="20px" viewBox="0 0 515.555 515.555" width="20px" ><path d="m303.347 18.875c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0"/><path d="m303.347 212.209c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0"/><path d="m303.347 405.541c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0"/></svg>
        </button>
        {isShowList && menuList()}
      </div>
    )
  }
  const stickersOnPage = (stickers) => {
    return (
      <div >
        {stickers.map((el) => {
          return (
          <Sticker 
            options={el} 
            key={el.id}
            handlerClickImportant={handlerClickImportant}
            handlerClickFavorite={handlerClickFavorite}
            handlerClickClose={handlerClickClose}
            handlerChangeStickerArea={handlerChangeStickerArea}
          />)
        })}
      </div>
    )
  }

  return (
    <div 
      className={classes.Board} 
      onDoubleClick={props.addSticker}
      onMouseDown={(e) => handlerMouseDown(e)}
      onMouseUp={(e) => handlerMouseUp(e)} 
    >
      {
      loading 
      ? <Spinner/> 
      : <>
          {menu()}
          <h2 className={classes.title}>{name}</h2>
          {stickers.length === 0 && <span className={classes.help}>make double click on the board to create a sticker</span>}
          
          {stickersOnPage(stickers)}
        </>
      }
    </div>
  )
} 

const mapStateToProps = (state) => {
  return {
    'loading': state.board.loading,
    'data': state.board,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBoard: (id) => dispatch(fetchBoard(id)),
    addSticker: (e) => dispatch(addSticker(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
