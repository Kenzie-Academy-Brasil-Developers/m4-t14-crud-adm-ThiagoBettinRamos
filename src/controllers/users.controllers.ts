import { Request, Response } from 'express'
import { createUserService, deleteUserService, listUsersAllService, reactiveUserService, listUserLoginService, updateUserService } from '../services/users/index'
import { iUserCreate, iUserPassword, iUserAll, iUserUpdate } from '../interfaces/users.interfaces'
import { AppError } from '../errors'

const createUser = async (request: Request, response: Response): Promise<Response> => {
  const userData: iUserCreate = request.body
	const createNewUser: iUserPassword = await createUserService(userData)
	return response.status(201).json(createNewUser)
}

const listUsersAll = async ( request: Request,response: Response ): Promise<Response> => {
	const usersAll: iUserAll = await listUsersAllService()
	return response.status(200).json(usersAll)
}

const listUserLogin = async ( request: Request,response: Response ) : Promise<Response> => {
	const { id } = request.user
	const listUser: iUserPassword = await listUserLoginService(id)
	return response.status(200).json(listUser)
}

const deleteUser = async ( request: Request, response: Response ) : Promise<Response> => {
	const id: number = parseInt(request.params.id);
	const { id: userId, admin } = request.user;

	if (!admin && id !== userId){
		throw new AppError('Insufficient Permission', 403)
	} await deleteUserService(id)
	return response.status(204).send()
}

const reactiveUser = async ( request: Request, response: Response) : Promise<Response> => {
  const id: number = parseInt(request.params.id)
	const userId: iUserPassword = await reactiveUserService(id);
	return response.status(200).json(userId)
}

const userUpdate = async ( request: Request,response: Response ): Promise<Response> => {
  const userData: iUserUpdate = request.body
  const userId: number = Number(request.params.id)
  const User: iUserPassword = await updateUserService(userData, userId)
  return response.status(200).json(User)
}


export { createUser, listUsersAll, listUserLogin, deleteUser, reactiveUser, userUpdate}