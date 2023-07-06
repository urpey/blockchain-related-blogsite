import Knex from "knex";
import {env} from './env'
const knexConfig = require("../knexfile");

export const knex = Knex(knexConfig[env.NODE_ENV]);