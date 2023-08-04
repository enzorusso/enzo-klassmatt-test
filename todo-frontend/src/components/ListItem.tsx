import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../model/task';

import '../styles/ListItem.css';
import 'react-datepicker/dist/react-datepicker.css';
import { editTask } from '../services/tasks';
import { toast } from 'react-toastify';

const addZeros = (n: number) => n<10? '0'+n:''+n;
const formatDate = (d: Date) => `${addZeros(d.getDate())}/${addZeros(d.getMonth() + 1)}/${d.getFullYear()}`;

function ListItem({
	task,
	onEdit,
	onDelete,
}: {
	task: Task;
	onEdit: (task: Task) => void;
	onDelete: (id: string) => void;
}) {
	const [checked, isChecked] = useState(task.checked);

	const handleCheckedChange = async () => {
		const newState = !checked;
		isChecked(newState);
		try {
			await editTask({ ...task, checked: newState });
			if (newState) {
				toast.success('Parabéns! Tarefa concluída!');
			}
		} catch (err: any) {
			toast.error('Algo deu errado! ' + err.message);
		}
	};

	return (
		<div className="item">
			<input type="checkbox" checked={checked} onChange={handleCheckedChange} />
			<div className="labels">
				<p className="title-task"> {task.title} </p>
				<p className="description"> {task.description} </p>
				<p className="date"> {task?.due_date && formatDate(new Date(task.due_date))} </p>
			</div>

			<FontAwesomeIcon
				className="icon-button-edit"
				onClick={() => onEdit(task)}
				icon={faPencil}
			></FontAwesomeIcon>
			<FontAwesomeIcon
				className="icon-button-delete"
				onClick={() => onDelete(task.id)}
				icon={faTrash}
			></FontAwesomeIcon>
		</div>
	);
}

export default ListItem;
