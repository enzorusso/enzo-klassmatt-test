import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import { createTask, deleteTask, editTask, getAll } from '../services/tasks';
import { Task } from '../model/task';

import ListItem from '../components/ListItem';
import Modal from '../components/Modal';

import '../styles/ListComponent.css';

const DEFAULT_TASK = { title: '', description: '', checked: false };

function TodoList() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [activeEditTask, setActiveEditTask] = useState<Task>(DEFAULT_TASK);
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

	const openModal = (task?: Task) => {
		if (task) {
			setActiveEditTask(task);
		} else {
			setActiveEditTask({} as Task);
		}

		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleDeleteTask = async (task: Task) => {
		if (!task.id) {
			toast.error('Houve um erro ao remover a tarefa. Por favor, tente novamente.');
			return;
		}

		try {
			await deleteTask(task.id);
			toast.success(`Tarefa removida!`);
		} catch (err: any) {
			if (err.status === '404') {
				toast.error(`Id ${task.id} não encontrado para deleção!`);
			} else {
				toast.error('Algo deu errado! ' + err.message);
			}
		}
		fetchTasks();
	};

	const saveTask = async (task: Task) => {
		if (task?.id) {
			await editTask({ ...task, id: task.id });
		} else {
			await createTask(task);
		}
		fetchTasks();
		closeModal();
	};

	return (
		<div className="content">
			<h4>Todo List</h4>
			<div className="list">
				{tasks?.length > 0 ? (
					tasks.map((task, i) => (
						<ListItem
							task={task}
							onDelete={handleDeleteTask}
							onEdit={() => openModal(task as Task)}
							key={task.id}
						/>
					))
				) : (
					<p className="none"> Nenhum lembrete disponível. </p>
				)}
			</div>
			<button className="add-button" onClick={() => openModal()}>
				<FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>&nbsp; Novo Lembrete
			</button>
			<Modal open={isModalOpen} task={activeEditTask} onSave={saveTask} onClose={closeModal} />
		</div>
	);
}

export default TodoList;
