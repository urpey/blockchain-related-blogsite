import express, { json, urlencoded } from 'express'
import { env } from './env'
import { print } from 'listening-on'
import cors from 'cors'
import { usersRoutes } from './users-Routes'
import { articleRoutes } from './article-route'

let app = express()

app.use(
  cors({
    origin: env.NODE_ENV === 'production' ? env.REACT_APP_ORIGIN : '*',
  }),
)

app.use(json())
app.use(urlencoded({ extended: false }))
app.use('/uploads',express.static('uploads/'))
app.use(usersRoutes)
app.use(articleRoutes)


app.listen(env.PORT, () => {
  print(env.PORT)
})
