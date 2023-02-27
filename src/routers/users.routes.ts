import { Router } from 'express'
import { createUser, listUsersAll, listUserLogin, reactiveUser,deleteUser, userUpdate} from '../controllers/users.controllers'
import { validateAdmin, validateBody, tokenVerify, emailExistsVerify } from '../middlewares/index'
import { createUserSchema, updateUserSchema } from '../schemas/users.schema'

const userRoutes: Router = Router()

userRoutes.post('',	validateBody(createUserSchema), createUser)

userRoutes.get('', validateAdmin, listUsersAll )

userRoutes.get('/profile', tokenVerify, listUserLogin)

userRoutes.patch('/:id', tokenVerify, validateBody(updateUserSchema), userUpdate)

userRoutes.delete('/:id', tokenVerify, deleteUser)

userRoutes.put('/:id/recover', validateAdmin, emailExistsVerify, reactiveUser)

export default userRoutes