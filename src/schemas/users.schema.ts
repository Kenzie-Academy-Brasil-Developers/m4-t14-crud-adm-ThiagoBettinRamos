import { hashSync } from 'bcryptjs'
import { z } from "zod"

const createUserSchema = z.object({
	name: z.string().min(3).max(20),
	email: z.string().email().min(5).max(100),
	password: z.string().min(8).transform((pass) => hashSync(pass, 10)),
    admin:z.boolean().optional(),
    active: z.boolean()
})

const userSchema = createUserSchema.extend({
	id: z.number(),
})

const userSchemaPassword = userSchema.omit({ password: true })

const allUsersSchema = z.array(userSchemaPassword)

const updateUserSchema = z.object({
	name: z.string().min(3).max(20).optional(),
	email: z.string().email().min(10).max(60).optional(),
	password: z.string().min(8).transform((pass) => hashSync(pass, 10)).optional()
})

export { createUserSchema, userSchema, userSchemaPassword, allUsersSchema, updateUserSchema }