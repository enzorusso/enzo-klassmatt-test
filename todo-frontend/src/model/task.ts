export type ModifyTask = {
  id?: string,
  title: string,
  description: string,
  dueDate?: string,
  checked: boolean
}

export type Task = {
  id: string,
  title: string,
  description: string,
  dueDate?: string,
  checked: boolean
}