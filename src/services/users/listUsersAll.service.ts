import { iUserAll } from '../../interfaces/users.interfaces'
import { QueryResult } from 'pg'
import { client } from '../../database'


const listUsersAllService = async (): Promise<iUserAll> => {
	const query: string = 
    `
        SELECT 
            id, name, email, admin, active 
        FROM 
            users;
    `
	const queryResult: QueryResult = await client.query(query)

	const usersAll: iUserAll = queryResult.rows[0]

	return usersAll
}

export default listUsersAllService