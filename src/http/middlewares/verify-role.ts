import { Role } from '@prisma/client'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

export function verifyRole(requiredRoles: Role[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (!requiredRoles.includes(role)) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
