import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeListPurchasedTickets } from '@/use-cases/factories/make-list-purchased-tickets'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listPurchases(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const useCase = makeListPurchasedTickets()
  try {
    const { purchasedTickets } = await useCase.execute({
      userId: request.user.sub,
    })
    return reply.status(201).send({ purchasedTickets })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
    throw error
  }
}
