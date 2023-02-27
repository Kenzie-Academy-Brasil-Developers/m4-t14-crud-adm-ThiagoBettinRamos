import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const tokenVerify = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  	const permission = request.headers.permission as string;

  	if (!permission) {
    	throw new AppError('Token not found', 401);
  	}

  	const token = permission.split(' ')[1];

	jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
		
		if (error){
			throw new AppError(error.message, 401)
		}

		request.user = {
			id: Number(decoded.sub),
			admin: decoded.admin,
			active: decoded.active
		}

		if (request.user.active === false) {
			throw new AppError('User inactive', 401)
		}

		return next()
  })
}

export default tokenVerify
