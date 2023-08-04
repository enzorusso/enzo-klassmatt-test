import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import '../styles/ListComponent.css';
import { ModifyTask, Task } from '../model/task';
import { createTask, deleteTask, editTask, getAll } from '../services/tasks';
import ListItem from './ListItem';
import Modal from './Modal';
import { toast } from 'react-toastify';

const DEFAULT_TASK = { title: '', description: '', checked: false };

function ListComponent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeEditTask, setActiveEditTask] = useState<ModifyTask>(DEFAULT_TASK);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const response: Task[] = await getAll();
      setTasks(response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const openModal = (task?: ModifyTask) => {
    if(task) {
      setActiveEditTask(task);
    }
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleDeleteTask =async ( id:string) => {
    try{
      await deleteTask(id);
      
    } catch(err: any) {
      if(err.status === '404') {
        toast.error(`Id ${id} não encontrado para deleção!`)
      } else {
        toast.error('Algo deu errado! ' + err.message)
      }
    }
      fetchTasks();
  }
  
  const saveTask = async (task: ModifyTask) => {
    if(task?.id) {
      await editTask({...task, id: task.id});
    } else {
      await createTask(task);
    }
    fetchTasks();
    closeModal();
    setActiveEditTask(DEFAULT_TASK);
  }

  return (
    <div className='content'>
      <h4>Todo List</h4>
      <div className='list'>
        {tasks?.length > 0 ? 
        tasks.map((task, i) => (
          <ListItem task={task} onDelete={handleDeleteTask} onEdit={() => openModal(task)} key={task.id} />)) :
          <p className='None'> Nenhum lembrete disponível. </p>
        }
        <button className='Add-button' onClick={() => openModal()}>
          <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>&nbsp;
            Novo Lembrete
        </button>
          <Modal open={isModalOpen} task={activeEditTask} onSave={saveTask} onClose={closeModal} />
      </div>
    </div>
  );
}

export default ListComponent;
