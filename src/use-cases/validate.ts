import { Ticket } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { TicketsRepository } from '@/repositories/tickets-repository'
import { TicketHasAlreadyBeenValidatedError } from './errors/ticket-has-already-been-validated'

interface ValidateUseCaseRequest {
  ticketId: string
}

interface ValidateUseCaseReply {
  validatedTicket: Ticket
}

export class ValidateUseCase {
  constructor(private ticketsRepository: TicketsRepository) { }

  async execute(data: ValidateUseCaseRequest): Promise<ValidateUseCaseReply> {
    const ticket = await this.ticketsRepository.findById(data.ticketId)
    if (!ticket) {
      throw new ResourceNotFoundError()
    }
    if (ticket.validated_at) {
      throw new TicketHasAlreadyBeenValidatedError()
    }
    ticket.validated_at = new Date()
    await this.ticketsRepository.save(ticket)
    return { validatedTicket: ticket }
  }
}
