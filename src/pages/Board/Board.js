import React, { useState, useEffect } from 'react';
import classes from './Board.module.scss';
import Sticker from '../../component/Sticker/Sticker.js';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'; 
import {addSticker, fetchBoard, dragSticker, dropSticker} from '../../store/actions/board.js';
import {Spinner} from '../../component/Spinner/Spinner.js';

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
      < >
        {stickers.map((el) => {
          return (
          <Sticker 
            options={el} 
            key={el.id}
          />)
        })}
      </>
    )
  }

  return (
    <div 
      className={classes.Board} 
      onDoubleClick={props.addSticker}
      onMouseDown={(e) => props.dragSticker(e, classes.moveSticker)}
      onMouseUp={(e) => props.dropSticker(e, classes.moveSticker)} 
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
    addSticker: (e) => dispatch(addSticker(e)),
    dragSticker: (e, movedStickerClass) => dispatch(dragSticker(e, movedStickerClass)),
    dropSticker: (e, movedStickerClass) => dispatch(dropSticker(e, movedStickerClass)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
