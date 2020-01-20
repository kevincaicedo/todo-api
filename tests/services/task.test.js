import { UserModel } from '../../src/models/user'
import { saveUser } from '../../src/repository/user'
import {
  createTask,
  editTask,
  getAllTaskByUser,
  removeTask
} from '../../src/services/task'

let userGlobal
const createUser = async () => {
  if (userGlobal) return userGlobal

  userGlobal = UserModel({
    name: 'Kevin',
    email: `kevin${Date.now()}@gmail.com`,
    password: '12345'
  })
  userGlobal = await saveUser(userGlobal)
  return userGlobal
}

describe('task crud service', () => {
  test('it should create one task', async done => {
    const user = await createUser()
    const task = {
      name: 'tarea 8',
      priority: 'muy alta',
      state: 'iniciada',
      fecha: 'Mon Jan 20 2020 01:53:15 GMT+0000'
    }
    const savedTask = await createTask(task, user._id)

    expect(savedTask.status).toEqual(200)
    expect(savedTask.data.name).toEqual(task.name)
    done()
  })

  test('it should update one task', async done => {
    const user = await createUser()
    const task = {
      name: 'tarea 8',
      priority: 'muy alta',
      state: 'iniciada',
      fecha: 'Mon Jan 20 2020 01:53:15 GMT+0000'
    }
    const savedTask = await createTask(task, user._id)
    savedTask.data.name = 'otra tarea'
    const updatedTask = await editTask(savedTask.data, user._id)

    expect(updatedTask.status).toEqual(200)
    expect(updatedTask.error).toBeUndefined()
    done()
  })

  test('it should get one o more task', async done => {
    const user = await createUser()
    const task = {
      name: 'tarea 8',
      priority: 'muy alta',
      state: 'iniciada',
      fecha: 'Mon Jan 20 2020 01:53:15 GMT+0000'
    }
    await createTask(task, user._id)
    const allTask = await getAllTaskByUser(user._id)

    expect(allTask.status).toEqual(200)
    expect(allTask.data.length).toBeGreaterThanOrEqual(1)
    done()
  })

  test('it should auth valided user', async done => {
    const user = await createUser()
    const task = {
      name: 'tarea 7',
      priority: 'muy alta',
      state: 'iniciada',
      fecha: 'Mon Jan 20 2020 01:53:15 GMT+0000'
    }
    const savedTask = await createTask(task, user._id)
    const delTask = await removeTask(savedTask.data._id, user._id)

    expect(delTask.status).toEqual(200)
    expect(delTask.error).toBeUndefined()
    done()
  })
})
