import { UniversityServerAlreadyExistsError } from '@/use-cases/errors/university-server-already-exists'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeCreateUniversityServer } from '@/use-cases/factories/make-create-university-server'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function universityServers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const universityServersBodySchema = z.object({
    siape: z.string(),
    passport: z.string(),
  })

  const data = universityServersBodySchema.parse(request.body)

  const useCase = makeCreateUniversityServer()
  try {
    const { universityServer } = await useCase.execute(data)
    return reply.status(201).send({ universityServer })
  } catch (error) {
    if (
      error instanceof UniversityServerAlreadyExistsError ||
      error instanceof UserAlreadyExistsError
    ) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
