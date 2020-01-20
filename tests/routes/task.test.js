import request from 'supertest'
import app from '../../src/index'

let userGlobal
const createUser = async () => {
  if (userGlobal) return userGlobal

  const user = {
    email: `htest${Date.now()}@gmail.com`,
    name: 'Kevin Caicedo',
    password: 'test 1232'
  }
  userGlobal = (
    await request(app)
      .post('/api/user/create')
      .send(user)
  ).body

  return userGlobal
}

describe('task api crud', () => {
  it('should create one task with user auth', async done => {
    const user = await createUser()
    const task = {
      name: 'tarea test',
      priority: 'muy alta',
      state: 'iniciada',
      fecha: 'Mon Jan 20 2020 01:53:15 GMT+0000'
    }
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', 'Bearer ' + user.token)
      .send(task)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('name')
    expect(res.body.name).toEqual(task.name)
    done()
  })

  it('should editar one task with user auth', async done => {
    const user = await createUser()
    const task = {
      name: 'tarea test',
      priority: 'muy alta',
      state: 'iniciada',
      fecha: 'Mon Jan 20 2020 01:53:15 GMT+0000'
    }
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', 'Bearer ' + user.token)
      .send(task)

    const resEdit = await request(app)
      .put('/api/tasks')
      .set('Authorization', 'Bearer ' + user.token)
      .send(res.body)

    expect(resEdit.statusCode).toEqual(200)
    expect(resEdit.body).toHaveProperty('name')
    done()
  })

  it('should eliminar one task with user auth', async done => {
    const user = await createUser()
    const task = {
      name: 'tarea test',
      priority: 'muy alta',
      state: 'iniciada',
      fecha: 'Mon Jan 20 2020 01:53:15 GMT+0000'
    }
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', 'Bearer ' + user.token)
      .send(task)

    const deletedTask = await request(app)
      .delete(`/api/tasks/${res.body._id}`)
      .set('Authorization', 'Bearer ' + user.token)
      .send()

    expect(deletedTask.statusCode).toEqual(200)
    expect(deletedTask.body).toHaveProperty('name')
    done()
  })

  it('should get all task with user auth', async done => {
    const user = await createUser()
    const task = {
      name: 'tarea test',
      priority: 'muy alta',
      state: 'iniciada',
      fecha: 'Mon Jan 20 2020 01:53:15 GMT+0000'
    }
    await request(app)
      .post('/api/tasks')
      .set('Authorization', 'Bearer ' + user.token)
      .send(task)

    const allTask = await request(app)
      .get(`/api/tasks`)
      .set('Authorization', 'Bearer ' + user.token)
      .send()

    expect(allTask.statusCode).toEqual(200)
    expect(allTask.body.length).toBeGreaterThanOrEqual(1)
    done()
  })
})
