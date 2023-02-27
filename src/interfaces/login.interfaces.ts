import { createLoginSchema } from '../schemas/login.schema'
import { z } from 'zod'

type iLoginUserRequest = z.infer<typeof createLoginSchema>

export { iLoginUserRequest }

