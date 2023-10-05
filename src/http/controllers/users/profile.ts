import { makeProfile } from '@/use-cases/factories/make-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeProfile()

  const user = await useCase.execute({ userId: request.user.sub })

  if (!user) {
    return reply.status(404)
  }
  return reply.status(200).send({
    ...user,
    password_hash: undefined,
  })
}
