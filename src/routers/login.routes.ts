import { Router } from 'express'
import loginController from '../controllers/login.cotrollers'
import { validateBody } from '../middlewares/index'
import { createLoginSchema } from '../schemas/login.schema'

const loginRoutes: Router = Router()

loginRoutes.post('', validateBody(createLoginSchema), loginController)

export default loginRoutes