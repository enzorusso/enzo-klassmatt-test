export type ModifyTask = {
  id?: string,
  title: string,
  description: string,
  due_date?: string,
  checked: boolean
}

export type Task = {
  id: string,
  title: string,
  description: string,
  due_date?: string,
  checked: boolean
}