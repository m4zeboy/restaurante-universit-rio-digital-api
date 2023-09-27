import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { students } from './students'
import { universityServers } from './university-servers'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyRole } from '@/http/middlewares/verify-role'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post(
    '/students',
    {
      onRequest: [verifyJWT, async () => verifyRole(['ADMIN'])],
    },
    students,
  )
  app.post(
    '/university-servers',
    {
      onRequest: [verifyJWT, async () => verifyRole(['ADMIN'])],
    },
    universityServers,
  )
}
