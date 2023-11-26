import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controllers/users/routes'
import { dishesRoutes } from './http/controllers/dishes/routes'
import { appRoutes } from './http/controllers/routes'
import cors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import { purchasesRoutes } from './http/controllers/purchases/routes'

export const app = fastify()

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    console.error(error)

    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO Here we should log to an external tool like DATADOG
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '1h',
  },
})

app.register(fastifyCookie)

app.register(cors, {
  origin: '*',
})

app.register(usersRoutes)
app.register(dishesRoutes)
app.register(purchasesRoutes)
app.register(appRoutes)
