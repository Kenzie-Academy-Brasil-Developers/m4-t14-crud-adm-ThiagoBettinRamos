import { Request, Response } from 'express'
import { createUserService, deleteUserService, listUsersAllService, reactiveUserService, listUserLoginService } from '../services/users/index'

const createUser = (request: Request, response: Response): Response => {
  /*   createUserService() */
    return response.json({
        message: 'funcionando'
    })
}

export { createUser }