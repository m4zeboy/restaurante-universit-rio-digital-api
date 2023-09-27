import { StudentAlreadyExistsError } from '@/use-cases/errors/student-already-exists'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeCreateStudent } from '@/use-cases/factories/make-create-student'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function students(request: FastifyRequest, reply: FastifyReply) {
  const studentsBodySchema = z.object({
    rga: z.string(),
    passport: z.string(),
    unique_register: z.string().optional(),
  })

  const data = studentsBodySchema.parse(request.body)

  const useCase = makeCreateStudent()
  try {
    const { student } = await useCase.execute(data)
    return reply.status(201).send({ student })
  } catch (error) {
    if (
      error instanceof StudentAlreadyExistsError ||
      error instanceof UserAlreadyExistsError
    ) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
