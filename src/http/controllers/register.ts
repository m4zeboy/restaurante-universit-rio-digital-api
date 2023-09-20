import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeRegister } from '@/use-cases/factories/make-register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    passport: z.string(),
    password: z.string(),
    role: z
      .enum(['ADMIN', 'USER', 'STUDENT', 'UNIVERSITY_SERVER'])
      .default('USER'),
  })

  const data = registerBodySchema.parse(request.body)

  const useCase = makeRegister()
  try {
    await useCase.execute(data)
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send()
    }
    throw error
  }
}
