import React, {useEffect} from "react";
import './App.css';
import Menu from './pages/Menu/Menu.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  } from "react-router-dom";
import Board from './pages/Board/Board.js'; 
import { NotFound } from "./pages/404/NotFound.js";
import { connect } from "react-redux";
import {fetchBoards} from './store/actions/menu.js';


function App(props) {

  useEffect(() => {
    props.fetchBoards();
  }, []);

  // const pages = () => {
  //   const boards = props.boards
  //   const result = [];
  //   for (let board in boards) {
  //     // console.log(board)
  //     result.push(<Route path={`/${boards[board].id}`} key={boards[board].id} component={Board}></Route>)
  //   }
  //   return result;
  //   return 
  // }
  const pages = props.boards.map((el) => {
      return (
        <Route path={`/${el.id}`} key={el.id} component={Board}></Route>
        // <Route path={`/${el.id}`} key={el.name} component={Board}>
        //   <Board name={el.name} initialStickers={el.stickers}/>
        // </Route>
      )
  })

  return (
       <div className="App">
        <Router>
          <Switch>
            <Route path='/' exact component={Menu} />
            {pages}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
  );
}
const mapStateToProps = (state) => {
  return {
    'boards': state.boards.boards,
    'loading': state.boards.loading
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchBoards: () => dispatch(fetchBoards()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
