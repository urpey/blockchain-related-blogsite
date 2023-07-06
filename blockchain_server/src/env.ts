import { config } from 'dotenv'
import populateEnv from 'populate-env'

config()

export let env = {
    POSTGRES_DB:'',
    POSTGRES_USER:'',
    POSTGRES_PASSWORD:'',
    POSTGRES_HOST:'localhost',
    NODE_ENV: 'development',
    PORT: 8100,
    JWT_SECRET: 'secret',
    REACT_APP_ORIGIN: '*',

}

populateEnv(env, { mode: 'halt' })
