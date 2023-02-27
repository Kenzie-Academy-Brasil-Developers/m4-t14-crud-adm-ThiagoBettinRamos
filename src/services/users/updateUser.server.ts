import { QueryConfig, QueryResult } from 'pg'
import { iUserUpdate, iUserPassword, iUserResultWithPassword } from '../../interfaces/users.interfaces'
import { AppError } from '../../errors'
import { client } from '../../database'
import format from 'pg-format'

const updateUserService = async ( userId: number, updateUser: iUserUpdate) : Promise<iUserPassword | any> => {
	
    if (updateUser.email) {
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
			values: [updateUser.email]
		}

		const queryResultUserExists: QueryResult = await client.query(
			queryConfig
		)

		if (queryResultUserExists.rowCount !== 0) {
			throw new AppError('User already exists', 409)
		}
	}

    const query: string =
    `
    SELECT 
        name 
    FROM 
        users 
    WHERE 
        id = $1;
    `

	const queryConfig: QueryConfig = {
		text: query,
		values: [userId]
	}

	const { rows } = await client.query(queryConfig);

	if (rows[0].name === updateUser.name) {
		throw new AppError(
			'The entered ""name" is already in use, try entering another value'
		)
	}

	const queryString: string = format(
		`
        UPDATE 
            users
        SET 
            (%I) = (%L)
        WHERE 
            id = %s
        RETURNING 
            id, name, email, admin, active;`,
		Object.keys(updateUser),
		Object.values(updateUser),
		userId
	)

	const queryResult: iUserResultWithPassword = await client.query(queryString)

	return queryResult.rows[0]
}

export default updateUserService