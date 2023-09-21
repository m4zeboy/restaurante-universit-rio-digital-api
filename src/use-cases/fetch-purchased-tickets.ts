import { Ticket } from '@prisma/client'
import { WalletsRepository } from '@/repositories/wallets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { TicketsRepository } from '@/repositories/tickets-repository'

interface FetchPurchasesTicketsUseCaseRequest {
  userId: string
}

interface FetchPurchasesTicketsUseCaseReply {
  purchasedTickets: Ticket[]
}

export class FetchPurchasesTicketsUseCase {
  constructor(
    private walletsRepository: WalletsRepository,
    private usersRepository: UsersRepository,
    private ticketsRepository: TicketsRepository,
  ) { }

  async execute(
    data: FetchPurchasesTicketsUseCaseRequest,
  ): Promise<FetchPurchasesTicketsUseCaseReply> {
    const user = await this.usersRepository.findById(data.userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const wallet = await this.walletsRepository.findByUserId(data.userId)

    if (!wallet) {
      throw new ResourceNotFoundError()
    }

    const purchasedTickets = await this.ticketsRepository.findManyByWalletId(
      wallet.id,
    )

    return { purchasedTickets }
  }
}
