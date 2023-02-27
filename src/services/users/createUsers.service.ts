import { iUserCreate, iUserPassword } from '../../interfaces/users.interfaces'
import { createUserSchema  } from '../../schemas/users.schema'
import { QueryResult } from 'pg'
import { client } from '../../database'
import format from 'pg-format'

const createUserService =  async ( userData: iUserCreate ) : Promise<iUserPassword> => {
    const dataUser = createUserSchema.parse(userData)
    const query: string = format(
    `
        INSERT INTO
            users (%I)
        VALUES 
            (%L)
        RETURNING 
            id, name,email,admin,active;
    `,
    Object.keys(dataUser),
    Object.values(dataUser)
    )
  
    const queryResult: QueryResult<iUserPassword> = await client.query(
      query
    )
  
    return queryResult.rows[0]
}

export default createUserService