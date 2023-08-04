import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../model/task';

import '../styles/ListItem.css';
import 'react-datepicker/dist/react-datepicker.css';
import { editTask } from '../services/tasks';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { format, isAfter } from 'date-fns';

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

	const isDateOverdue = useMemo(
		() => task?.dueDate && isAfter(new Date(task.dueDate), new Date()) && !checked,
		[task.dueDate, checked]
	);

	return (
		<div className="item">
			<input type="checkbox" checked={checked} onChange={handleCheckedChange} />
			<div className={classNames('labels', { striked: checked })}>
				<p className="title-task"> {task.title} </p>
				<p className="description"> {task.description} </p>
				<p className={classNames('date', { overdue: isDateOverdue })}>
					{' '}
					{task?.dueDate && format(new Date(task.dueDate), 'dd/MM/yyyy')}{' '}
				</p>
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
