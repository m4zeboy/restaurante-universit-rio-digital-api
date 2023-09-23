import { FastifyInstance } from 'fastify'
// import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { register } from './register'
// import { authenticate } from './authenticate'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  // app.post('/sessions', authenticate)
  /* AUTHENTICATED */
  // app.get('/me', { onRequest: [verifyJWT] }, profile)
}
