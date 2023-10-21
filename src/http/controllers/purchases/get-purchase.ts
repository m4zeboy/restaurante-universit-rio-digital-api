import { prisma } from '@/lib/prisma'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeListPurchasedTickets } from '@/use-cases/factories/make-list-purchased-tickets'
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
  try {
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } })
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
