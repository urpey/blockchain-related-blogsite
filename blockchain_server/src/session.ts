import expressSession from 'express-session'

declare module 'express-session' {
  interface SessionData {
    counter?: number
    user?: {
      id: number
      username: string
    }
  }
}

export let sessionMiddleware = expressSession({
  
    secret: 'blockchain_project',
    resave: true,
    saveUninitialized: true,
  })