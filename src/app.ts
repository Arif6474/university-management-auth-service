import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import usersRouter from './app/modules/users/users.routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// global error handler
app.use(globalErrorHandler)

//routes
app.use('/api/users/', usersRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('server is running')
})

export default app
