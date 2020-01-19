import {
  saveTask,
  deleteTask,
  findTasksByUser,
  updateTask
} from '../../src/repository/task'
import { TaskModel } from '../../src/models/task'
import { UserModel } from '../../src/models/user'
import { saveUser } from '../../src/repository/user'

let userGlobal
const createUser = async () => {
  if (userGlobal) return userGlobal

  userGlobal = UserModel({
    name: 'Kevin',
    email: `pepe${Math.floor(Math.random() * 1000)}@gmail.com`,
    password: '12345'
  })
  userGlobal = await saveUser(userGlobal)
  return userGlobal
}

describe('crud operation repository task', () => {
  test('should saved one task', async done => {
    const user = await createUser()
    const task = new TaskModel({
      name: 'Prueba',
      priority: 'Prueba',
      state: 'Prueba',
      user: user
    })
    const taskSaved = await saveTask(task)

    expect(taskSaved).toBeTruthy()
    done()
  })

  test('should delete one task', async done => {
    const user = await createUser()
    const task = new TaskModel({
      name: 'Prueba',
      priority: 'Prueba',
      state: 'Prueba',
      user: user
    })
    const taskSaved = await saveTask(task)
    const taskRemoved = await deleteTask(taskSaved._id)
    expect(taskRemoved).toBeTruthy()
    done()
  })

  test('should return all task by user', async done => {
    const user = await createUser()
    const tasksByUser = await findTasksByUser(user._id)

    expect(tasksByUser).toBeTruthy()
    expect(tasksByUser.length).toBeTruthy()
    done()
  })

  test('should update one task by user', async done => {
    const user = await createUser()
    const task = new TaskModel({
      name: 'Prueba',
      priority: 'Prueba',
      state: 'Prueba',
      user: user
    })
    const taskSaved = await saveTask(task)
    taskSaved.name = 'Kevin Caicedo'

    await updateTask(taskSaved, user._id)
    const current = await TaskModel.findById(taskSaved._id)

    expect(current.name).toEqual(taskSaved.name)
    done()
  })
})
