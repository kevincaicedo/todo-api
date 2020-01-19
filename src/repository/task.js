import { TaskModel } from '../models/task'

export const saveTask = async task => {
  return await TaskModel.create(task)
}

export const deleteTask = async taskId => {
  const taskRemoved = await TaskModel.findByIdAndRemove(taskId)
  return taskRemoved
}

export const updateTask = async (task, userId) => {
  const taskUpdated = await TaskModel.findOneAndUpdate({ _id: task._id, user: userId }, task)
  return taskUpdated
}

export const findTasksByUser = async (userId) => {
  const tasks = await TaskModel.find({ user: userId })
  return tasks
}
