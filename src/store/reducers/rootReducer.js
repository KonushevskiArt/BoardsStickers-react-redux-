import { combineReducers } from "redux";
import {menuReducer} from './menuReducer.js';
import { boardReducer } from "./boardReducer.js";

export default combineReducers({
  boards: menuReducer,
  board: boardReducer
})