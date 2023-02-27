import { QueryConfig } from 'pg'
import { iUserResultWithPassword, iUserPassword} from '../../interfaces/users.interfaces'
import { client } from '../../database'

const listUserLoginService = async ( userId: number ): Promise<iUserPassword> => {
    const query: string = 
    `
    SELECT 
        id, name, email, admin, active 
    FROM
        users 
    WHERE 
        "id" = $1;
    `
	const queryConfig: QueryConfig = {
		text: query,
		values: [userId]
	}

	const queryResult: iUserResultWithPassword = await client.query(queryConfig)

	return queryResult.rows[0]
};

export default listUserLoginService