import React, { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCheckCircle, faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModifyTask, Task } from '../model/task';

import '../styles/Modal.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import InputComponent from './InputComponent';

const errorMessage = (fieldName: string) => `O campo ${fieldName} é obrigatório.`;

function Modal({open, task, onSave, onClose}:{open: boolean, task: ModifyTask, onSave: (task: ModifyTask) => void, onClose: () => void}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<string>();

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  }

  const handleCalendarChange = (date: Date) => {
    setDate(date?.toUTCString());
    toggleCalendar();
  }  

  useEffect(() => {
    if(open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open])

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    if(task.due_date) {
      setDate(task.due_date);
    }
  }, [task])

  // useEffect(() => {
  //   const currentRef = dialogRef.current;

  //   const handleClickOutside = (event: Event) => {
  //     if(event.target == currentRef) {
  //       onClose();
  //     }
  //   }

  //   currentRef?.addEventListener('click', handleClickOutside);
  //   return () => {
  //     currentRef?.removeEventListener('click', handleClickOutside);
  //   }

  // }, [dialogRef])

  const handleSave = () => {
    setSubmitted(true);
    if(!title || !description) return;
    onClose();
    onSave({...task, title, description, due_date: date});
  };

  return (
    <dialog className='modal' ref={dialogRef}>
      <div className='modal-header'>
      <h3 className='title'>{task?.id ? 'Editar' : 'Adicionar'} tarefa</h3>
      <FontAwesomeIcon className='x-icon' onClick={() => onClose()} icon={faXmark}></FontAwesomeIcon>
      </div>
    <div className='form'>
      <InputComponent
        placeholder='Adicione o título'
        label='Título'
        name='title'
        value={title}
        onChange={value => setTitle(value)}
        errorMessage={submitted && !title && errorMessage('Título')}
      />

      <InputComponent
        placeholder='Adicione a descrição'
        label='Descrição'
        name='description'
        value={description}
        onChange={value => setDescription(value)}
        errorMessage={submitted && !description && errorMessage('Descrição')}
      />


      <div className='datepicker'>
        <InputComponent
          type='datepicker'
          placeholder='Adicione a data'
          label='Data'
          name='due_date'
          readonly
          value={date} 
          onChange={handleCalendarChange}
        />
        </div>
        {/* {isCalendarOpen && 
        <DatePicker
          inline
          calendarClassName='calendar'
          selected={date}
          onChange={handleCalendarChange}
        />} */}
        <button className='button' onClick={handleSave}><FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>&nbsp;Salvar</button>
      </div>
    </dialog>
  );
}

export default Modal;
