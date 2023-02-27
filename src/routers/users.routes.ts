import { Router } from 'express'
import { createUser } from '../controllers/users.controllers'

const userRoutes: Router = Router()

userRoutes.post('', createUser)

export default userRoutes