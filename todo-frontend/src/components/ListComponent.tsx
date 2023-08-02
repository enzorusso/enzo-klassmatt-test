import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import InputComponent from './InputComponent';
import '../styles/ListComponent.css';

function ListComponent() {
  const tasks: any[] = [{title: 'skjflkd', description: 'fhdsjf', edit: true, checked: false, date: new Date()}];

  const addTask = () => {
    tasks.push();
    console.log('chegou');
  }

  return (
    <div className='Content'>
      <p>LEMBRETES</p>
      <div className='List'>
        {tasks.length > 0 ? 
        tasks.map(({title, description, edit, checked, date}, i) => (
          <InputComponent _todo={{title: title, description: description, checked: checked, date: date}} key={i}></InputComponent>
          )) :
          <p className='None'> Nenhum lembrete disponível. </p>
        }
        <button className='Add-button' onClick={addTask}>
          <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>&nbsp;
            Novo Lembrete
        </button>
      </div>
    </div>
  );
}

export default ListComponent;
