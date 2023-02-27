import { iUserPassword } from '../../interfaces/users.interfaces'
import { QueryConfig, QueryResult } from 'pg'
import { client } from '../../database'

const reactiveUserService = async ( userId: number ): Promise<iUserPassword> => {
    const query: string = 
    `
        UPDATE 
            users 
        SET 
            active = true 
        WHERE 
            "id" = $1 
        RETURNING 
            id, name, email, admin, active;
    `
	const queryConfig: QueryConfig = {
		text: query,
		values: [userId]
	}

	const queryResult: QueryResult = await client.query(queryConfig)

	return queryResult.rows[0]
}

export default reactiveUserService