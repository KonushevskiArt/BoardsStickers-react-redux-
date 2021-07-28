import React, { useState } from 'react';
import classes from './Menu.module.scss';
import {Layout} from '../../hoc/Layout/Layout.js';
import BoardInMenu from '../../component/BoardInMenu/BoardInMenu.js';
import AddBoard from '../../component/AddBoard/AddBoard.js';
import {Plus} from '../../component/Plus/Plus.js';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import {Spinner} from '../../component/Spinner/Spinner.js';

const  Menu = (props) => {

  const [isShowAddBoard, showAddBoard] = useState(false);
  const [stateBoards, setBoards] = useState(props.boards)


  useEffect(() => {
    setBoards(props.boards)
  },[props.boards])

  const handlerClickAddBoard = (name) => {
    showAddBoard(false);
  }
 
  const handlerClickPlus = () => {
    showAddBoard(true);
  }
  const handlerClickTrushCan = (name) => {

  }

  const boards = (arrBoards) => {
    return arrBoards.map((el, i) => {
      return <BoardInMenu el={el} key={i} handlerClickTrushCan={handlerClickTrushCan}/>
    })
  }
  
  const menu = () => {
    return (
      <>
        {boards(stateBoards)}
        {isShowAddBoard 
          ? <AddBoard 
              handlerClickAddBoard={handlerClickAddBoard}
            />
          : <Plus handlerClickPlus={handlerClickPlus}/>
        }
      </>
    )
  }

  return (
    <div className={classes.Menu}>
        <Layout>
        <h2>Menu</h2>
        <div className={classes.boardWrapper}>
          {props.loading ? <Spinner/> : menu()}
        </div>
      </Layout>
    </div>
  )
} 
const mapStateToProps = (state) => {
  return {
    'boards': state.boards.boards,
    'loading': state.boards.loading
  };
}


// export {Menu};
export default connect(mapStateToProps)(Menu);

