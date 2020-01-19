import { userAuthenticate, createUser } from '../../services/user'

export const authenticate = async (req, res, next) => {
  const reponse = await userAuthenticate(req.body)

  if (reponse.status == 200) res.status(200).send(reponse.data)
  else res.status(reponse.status).send({ error: reponse.error })
}

export const create = async (req, res, next) => {
  const reponse = await createUser(req.body)

  if (reponse.status == 200) res.status(200).send(reponse.data)
  else res.status(reponse.status).send({ error: reponse.error })
}
