import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

class AppError extends Error {
	message: string
	statusCode: number

	constructor(message: string, statusCode: number = 400) {
		super()
		this.message = message
		this.statusCode = statusCode
	}
}


const handleErrors = ( error: Error, request: Request, response: Response, next: NextFunction) : void | Response => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({ 
            message: error.message 
        })
    }
    
    if(error instanceof ZodError){
        return response.status(400).json({ 
            message: error.flatten().fieldErrors 
        })
    }
    
    return response.status(400).json({
        message: error.message
    })
}

export { AppError, handleErrors }