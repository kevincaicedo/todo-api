import { TaskModel } from '../models/task'

export const saveTask = async task => {
  /* eslint-disable-next-line */
  const taskSaved = await TaskModel.create(task)
  return taskSaved
}

export const deleteTask = async taskId => {
  const taskRemoved = await TaskModel.findByIdAndRemove(taskId)
  return taskRemoved
}

export const updateTask = async (task, userId) => {
  const taskUpdated = await TaskModel.findOneAndUpdate(
    { _id: task._id, user: userId },
    task
  )
  return taskUpdated
}

export const findTasksByUser = async userId => {
  const tasks = await TaskModel.find({ user: userId })
  return tasks
}
