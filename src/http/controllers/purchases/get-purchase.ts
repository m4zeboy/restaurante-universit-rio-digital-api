import { prisma } from '@/lib/prisma'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeGetPurchase } from '@/use-cases/factories/make-get-purchase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPurchase(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPurchaseParamsSchema = z.object({
    ticketId: z.string().uuid(),
  })

  const { ticketId } = getPurchaseParamsSchema.parse(request.params)
  const useCase = makeGetPurchase()
  try {
    const ticket = await useCase.execute({ ticketId })
    return reply.status(200).send({ ticket })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
    throw error
  }
}
