import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeAuthenticate } from '@/use-cases/factories/make-authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    passport: z.string(),
    password: z.string(),
  })

  const data = authenticateBodySchema.parse(request.body)

  const useCase = makeAuthenticate()
  try {
    const { user } = await useCase.execute(data)

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )
    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        sameSite: true,
        secure: true,
        httpOnly: true,
      })
      .status(201)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
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
