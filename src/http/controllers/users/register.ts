import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { WalletAlreadyExistsError } from '@/use-cases/errors/wallet-already-exists'
import { YouAreNotAStudentError } from '@/use-cases/errors/you-are-not-a-student'
import { YouAreNotAUniversityServerError } from '@/use-cases/errors/you-are-not-a-university-server'
import { makeCreateWallet } from '@/use-cases/factories/make-create-wallet'
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
      .default('USER')
      .optional(),
  })

  const data = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegister()
  const createWalletUseCase = makeCreateWallet()
  try {
    const { user } = await registerUseCase.execute(data)
    const { wallet } = await createWalletUseCase.execute({ userId: user.id })
    return reply.status(201).send({ wallet })
  } catch (error) {
    if (
      error instanceof UserAlreadyExistsError ||
      error instanceof WalletAlreadyExistsError ||
      error instanceof YouAreNotAStudentError ||
      error instanceof YouAreNotAUniversityServerError
    ) {
      return reply.status(409).send({
        message: error.message,
      })
    }
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
    throw error
  }
}
