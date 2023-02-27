import { createUserSchema, userSchema, userSchemaPassword, allUsersSchema, updateUserSchema } from '../schemas/users.schema'
import { z } from 'zod'
import { QueryResult } from "pg";

type iUserCreate = z.infer<typeof createUserSchema>

type iUserSchema = z.infer<typeof userSchema>

type iUserPassword = z.infer<typeof userSchemaPassword>

type iUserResultPassword = QueryResult<iUserPassword>

type iUserResultWithPassword = QueryResult<iUserSchema>

type iUserAll = z.infer<typeof allUsersSchema>

type iUserUpdate = z.infer<typeof updateUserSchema>

export { iUserCreate, iUserSchema, iUserPassword, iUserResultPassword, iUserResultWithPassword, iUserAll, iUserUpdate }
