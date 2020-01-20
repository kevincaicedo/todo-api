import {
  saveTask,
  updateTask,
  deleteTaskByUser,
  findTasksByUser
} from '../../src/repository/task'

export const createTask = async (task, userId) => {
  try {
    const savedTask = await saveTask({ ...task, user: userId })
    const { user, ...taskWithUser } = savedTask.toJSON()
    return {
      status: 200,
      data: {
        ...taskWithUser
      }
    }
  } catch (error) {
    return {
      status: 500,
      error: 'Ocurrio un error registrando las tarea'
    }
  }
}

export const editTask = async (task, userId) => {
  try {
    const updatedTask = await updateTask(task, userId)
    const { user, ...taskWithUser } = updatedTask.toJSON()
    return {
      status: 200,
      data: {
        ...taskWithUser
      }
    }
  } catch (error) {
    return {
      status: 500,
      error: 'Ocurrio un error actualizando las tarea'
    }
  }
}

export const removeTask = async (taskId, userId) => {
  try {
    const removedTask = await deleteTaskByUser(taskId, userId)
    const { user, ...taskWithUser } = removedTask.toJSON()
    return {
      status: 200,
      data: {
        ...taskWithUser
      }
    }
  } catch (error) {
    return {
      status: 500,
      error: 'Ocurrio un error eliminando las tarea'
    }
  }
}

export const getAllTaskByUser = async userId => {
  try {
    const listTask = await findTasksByUser(userId)
    return {
      status: 200,
      data: listTask
    }
  } catch (error) {
    return {
      status: 500,
      error: 'Ocurrio un error obteniedo tus tarea'
    }
  }
}
