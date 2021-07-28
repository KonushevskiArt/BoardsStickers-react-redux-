import { combineReducers } from "redux";
import {boardsReducer} from './boardsReducer.js';

export default combineReducers({
  boards: boardsReducer
})