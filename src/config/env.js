import dotenv from 'dotenv'
dotenv.config()

export const { DB_USER, DB_PASSWD, DB_HOST, DB_PORT } = process.env
