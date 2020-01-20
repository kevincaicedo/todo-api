import * as TaskService from '../../services/task'

export const createTask = async (req, res, next) => {
  if (!req.user) res.status(401).send({ error: 'No autorizado' })

  const resp = await TaskService.createTask(req.body, req.user._id)
  if (resp.error) res.status(resp.status).send({ error: resp.error })
  else res.status(200).send(resp.data)
}

export const updateTask = async (req, res, next) => {
  if (!req.user) res.status(401).send({ error: 'No autorizado' })

  const resp = await TaskService.editTask(req.body, req.user._id)
  if (resp.error) res.status(resp.status).send({ error: resp.error })
  else res.status(200).send(resp.data)
}

export const deleteTask = async (req, res, next) => {
  if (!req.user) res.status(401).send({ error: 'No autorizado' })

  const resp = await TaskService.removeTask(req.params.id, req.user._id)
  if (resp.error) res.status(resp.status).send({ error: resp.error })
  else res.status(200).send(resp.data)
}

export const getAllTaskByUser = async (req, res, next) => {
  if (!req.user) res.status(401).send({ error: 'No autorizado' })

  const resp = await TaskService.getAllTaskByUser(req.user._id)
  if (resp.error) res.status(resp.status).send({ error: resp.error })
  else res.status(200).send(resp.data)
}
