import express from 'express';
import { isLoggedIn } from './guard';
import {UsersController} from './users-controller';
import {UsersService} from './users-service';

const usersService = new UsersService;

export let usersRoutes = express.Router()
let userscontroller = new UsersController(usersService)
    usersRoutes.post('/login',userscontroller.login)
    usersRoutes.post('/register',userscontroller.register)
    usersRoutes.post('/userIcon',userscontroller.uploadIcon)
    usersRoutes.post('/changePassword',userscontroller.changePassword)
    usersRoutes.get('/userData',isLoggedIn,userscontroller.getDetail)
    usersRoutes.post('/userDetail',isLoggedIn,userscontroller.uploadDetail)

    // Editor
    usersRoutes.get('/getEditors',userscontroller.getEditors)