import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { students } from './students'
import { universityServers } from './university-servers'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/students', students)
  app.post('/university-servers', universityServers)
}
