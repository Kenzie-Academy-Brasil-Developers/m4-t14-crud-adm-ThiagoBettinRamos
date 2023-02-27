import { z } from 'zod'

const createLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})

export { createLoginSchema }