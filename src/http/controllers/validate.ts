import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { TicketHasAlreadyBeenValidatedError } from '@/use-cases/errors/ticket-has-already-been-validated'
import { makeValidateTicket } from '@/use-cases/factories/make-validate-ticket'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeValidateTicket()
  const validateParamsSchema = z.object({
    ticketId: z.string().uuid(),
  })
  const { ticketId } = validateParamsSchema.parse(request.params)
  try {
    const { validatedTicket } = await useCase.execute({
      ticketId,
    })
    return reply.status(201).send({ validatedTicket })
  } catch (error) {
    console.log(error)
    if (error instanceof TicketHasAlreadyBeenValidatedError) {
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
