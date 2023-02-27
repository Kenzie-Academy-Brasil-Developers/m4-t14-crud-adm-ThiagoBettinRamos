import { QueryConfig } from 'pg'
import { client } from '../../database'
import { AppError } from '../../errors'
import { compare } from 'bcryptjs'
import { iLoginUserRequest } from '../../interfaces/login.interfaces'
import jwt from 'jsonwebtoken'
import { iUserResultWithPassword } from '../../interfaces/users.interfaces'

const loginUserService = async (data: iLoginUserRequest): Promise<string> => {
	const { email, password } = data

	const query: string = 
    `
        SELECT 
            * 
        FROM 
            users 
        WHERE 
            email = $1;
    `
	const queryConfig: QueryConfig = {
		text: query,
		values: [email]
	}

    const queryResult: iUserResultWithPassword = await client.query(
		queryConfig
	)

    if (queryResult.rowCount === 0) {
        throw new AppError('Email or password are invalid', 401)
    }
    
    const matchPassword: boolean = await compare(
        password,
        queryResult.rows[0].password
    )
    
    if (!matchPassword) {
        throw new AppError('Email or password are invalid', 401)
    }
    
    if (!queryResult.rows[0].active) {
        throw new AppError('Email or password are invalid', 401)
    }

    const token: string = jwt.sign({
          admin: queryResult.rows[0].admin,
          active: queryResult.rows[0].active,
    },
    process.env.SECRET_KEY!,
    {
        expiresIn: '24h',
        subject: queryResult.rows[0].id.toString(),
    })

    return token
}


export { loginUserService }