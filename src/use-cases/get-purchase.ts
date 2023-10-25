import { WalletsRepository } from '@/repositories/wallets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { Ticket } from '@prisma/client'
import { TicketsRepository } from '@/repositories/tickets-repository'

interface GetPurchaseUseCaseRequest {
  ticketId: string
}

interface GetPurchaseUseCaseReply {
  ticket: Ticket
}

export class GetPurchaseUseCase {
  constructor(private ticketsRepository: TicketsRepository) { }

  async execute({
    ticketId,
  }: GetPurchaseUseCaseRequest): Promise<GetPurchaseUseCaseReply> {
    const doesPurchaseExist = await this.ticketsRepository.findById(ticketId)

    if (!doesPurchaseExist) {
      throw new ResourceNotFoundError()
    }

    return { ticket: doesPurchaseExist }
  }
}
