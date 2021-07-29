import React, { useState } from 'react';
import classes from './AddBoard.module.scss';
import { connect } from "react-redux";
import { addBoard } from '../../store/actions/menu';

function AddBoard(props) {

  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  
  const validationOnBlur = () => {
    setIsValid(/^[a-zA-Zа-яёА-ЯЁ]+$/g.test(value.trim()));
    if (!isValid) {
      setErrorMessage('Введите корректное значение, допустимы только кириллические, латинские символы без пробелов!');
    }
    if (value.length > 14) {
      setIsValid(false);
      setErrorMessage('Количество символов не должно быть больше 14');
    }
    if (value.length < 1) {
      setIsValid(false);
      setErrorMessage('Количество символов должно быть больше 1');
    }
  }

  const validationOnSubmit = () => {
    validationOnBlur();
    if (isValid) {
      props.onAdd(value.trim())
      props.handlerClickAddBoard(value.trim());
    }
  }

  const error = () => {
    return (
      <span className={classes.error}>{errorMessage}</span>
    )
  }

  return (
    <div className={classes.addBoard}>
      <label htmlFor="name">Enter name of board</label>
      <input 
        type="text" 
        name="name" 
        value={value} 
        onChange={(e) => setValue(e.currentTarget.value)}
        onBlur={validationOnBlur}/>
        {isValid ? null : error()}
      <button onClick={validationOnSubmit}>Add new board</button>
    </div>
  )
} 

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (name) => dispatch(addBoard(name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBoard);
