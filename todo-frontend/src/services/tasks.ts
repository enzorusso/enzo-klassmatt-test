import api from './api';
import { ModifyTask, Task } from '../model/task';

const serviceName = '/tasks';

export async function getAll(): Promise<Task[]> {
  const response = await api.get(`${serviceName}`);
  return response.data;
}

export async function createTask(task: ModifyTask) {
  let response = null;
  await api
    .post(`${serviceName}`, task)
    .then(data => (response = data))
    .catch(error => {
      throw error;
    });
  return response;
}

export async function deleteTask(id: string): Promise<any> {
  const response = await api
    .delete(`${serviceName}/${id}`)
    .then(response => response.data.data)
    .catch(error => {
      throw error;
    });
  return response;
}

export async function editTask(
  task: ModifyTask,
): Promise<ModifyTask> {
  const response = await api
    .put(`${serviceName}/${task.id}`, task)
    .then(response => response.data.data)
    .catch(error => {
      console.log(error);
    });
  return response;
}
