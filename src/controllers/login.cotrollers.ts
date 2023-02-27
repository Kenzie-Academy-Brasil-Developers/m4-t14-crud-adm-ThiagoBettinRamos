import { Request, Response } from 'express';

import loginUserService from '../services/login/login.service'

const loginController = async ( request: Request, response: Response ): Promise<Response> => {
	const token = await loginUserService(request.body)

	return response.json({
		token: token
	})
}

export default loginController