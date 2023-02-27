import { Request, Response, NextFunction } from 'express'
import { ZodTypeAny } from 'zod'

const validateBody = ( validateSchema: ZodTypeAny) =>( request: Request, response: Response, next: NextFunction ) => {
		const validatedBody = validateSchema.parse(request.body)
		request.body = validatedBody
		return next()
	}

export default validateBody