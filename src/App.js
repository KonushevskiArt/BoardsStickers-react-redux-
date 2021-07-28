import React, {useState, useEffect} from "react";
import './App.css';
import Menu from './pages/Menu/Menu.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  } from "react-router-dom";
import {Board} from './pages/Board/Board.js'; 
import { NotFound } from "./pages/404/NotFound.js";
import { connect } from "react-redux";
import {fetchBoards} from './store/actions/boards.js';


function App(props) {

  useEffect(() => {
    props.fetchBoards()
  }, [])

  const pages = props.boards.map((el) => {
      return (
        <Route path={`/${el.name}`} key={el.name}>
          <Board name={el.name} initialStickers={el.stickers}/>
        </Route>
      )
  })

  return (
       <div className="App">
        <Router>
          <Switch>
            <Route path='/' exact>
              <Menu/>
            </Route>
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
