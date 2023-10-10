import { InsuficientBalanceError } from '@/use-cases/errors/insuficient-balance'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makePurchaseTicket } from '@/use-cases/factories/make-purchase-ticket'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function purchase(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makePurchaseTicket()
  try {
    const { ticket } = await useCase.execute({
      userId: request.user.sub,
    })
    return reply.status(201).send({ ticket })
  } catch (error) {
    if (error instanceof InsuficientBalanceError) {
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
