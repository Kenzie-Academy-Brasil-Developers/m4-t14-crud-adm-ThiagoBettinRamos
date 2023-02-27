import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors'
import { QueryResult } from 'pg'
import { client } from '../database'
import format from 'pg-format'

const emailExistsVerify = async ( request: Request, response: Response, next: NextFunction ): Promise<Response | void> => {
    const email: string = request.body.email

    const query= format(
        `
        SELECT 
        EXISTS 
        (SELECT 1 FROM users WHERE email = %L)
        `,
        email
    )
    const queryResult = await client.query(query)
    const emailExists = queryResult.rows[0].exists
      
    if (emailExists) {
        throw new AppError("Email already exists", 409)
    }
    return next();
}

export default emailExistsVerify