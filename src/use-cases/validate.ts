import { Ticket } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { TicketsRepository } from '@/repositories/tickets-repository'

interface ValidateUseCaseRequest {
  ticketId: string
}

interface ValidateUseCaseReply {
  validatedTicket: Ticket
}

export class ValidateUseCase {
  constructor(private ticketsRepository: TicketsRepository) { }

  async execute(data: ValidateUseCaseRequest): Promise<ValidateUseCaseReply> {
    // check if the ticket exists
    const ticket = await this.ticketsRepository.findById(data.ticketId)
    if (!ticket) {
      throw new ResourceNotFoundError()
    }
    // check if the ticket has already been validated
    if (ticket.validated_at) {
      throw new Error('The ticket has already been validated.')
    }
    // validate the ticket
    ticket.validated_at = new Date()
    await this.ticketsRepository.save(ticket)
    return { validatedTicket: ticket }
  }
}
