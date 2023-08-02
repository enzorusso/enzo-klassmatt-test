import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Todo } from '../model/todo';

import '../styles/InputComponent.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

function InputComponent({_todo}:{_todo: Todo}) {
  const [todo, setTodo] = useState<Todo>(_todo);

  const handleChange = () => {
    setTodo({...todo, checked: !todo.checked});
  };

  return (
    <>
    <div className='Form'>
      <input 
        type='checkbox' 
        checked={todo.checked}
        onChange={handleChange}
      />
      <div className='Inputs'>
        <input 
          type='text'
          className='Title'
          placeholder='Adicionar título' 
          value={todo.title}
          onChange={event => setTodo({...todo, title: event.target.value})}
        />
        <input 
          type='text'
          className='Description'
          placeholder='Adicionar descrição'
          value={todo.description}
          onChange={event => setTodo({...todo, description: event.target.value})}
        />
      </div>
      <DatePicker 
        placeholderText='Data de expiração'
        className='Date'
        locale={'ptBR'} 
        selected={todo.date} 
        dateFormat={"dd/MM/yyyy"} 
        onChange={(date: Date) => setTodo({...todo, date: date})}
      />
    </div>
    <button className='Confirm-button'>
      <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>&nbsp;
      Adicionar
    </button>
    </>
  );
}

export default InputComponent;
