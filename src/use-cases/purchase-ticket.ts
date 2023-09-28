import { Ticket } from '@prisma/client'
import { WalletsRepository } from '@/repositories/wallets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { TicketsRepository } from '@/repositories/tickets-repository'
import { StudentsRepository } from '@/repositories/students-repository'
import { InsuficientBalanceError } from './errors/insuficient-balance'
import { getTicketPrice } from '@/utils/get-ticket-price'
import { GetTicketPriceUseCase } from './get-ticket-price'

interface PurchaseTicketUseCaseRequest {
  userId: string
}

interface PurchaseTicketUseCaseReply {
  ticket: Ticket
}

export class PurchaseTicketUseCase {
  constructor(
    private walletsRepository: WalletsRepository,
    private usersRepository: UsersRepository,
    private ticketsRepository: TicketsRepository,
    private studentsRepository: StudentsRepository,
  ) { }

  async execute(
    data: PurchaseTicketUseCaseRequest,
  ): Promise<PurchaseTicketUseCaseReply> {
    const user = await this.usersRepository.findById(data.userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const wallet = await this.walletsRepository.findByUserId(data.userId)

    if (!wallet) {
      throw new ResourceNotFoundError()
    }

    const getTicketPriceUseCase = new GetTicketPriceUseCase(
      this.studentsRepository,
    )

    const { price } = await getTicketPriceUseCase.execute({ user })

    if (user.role !== 'ADMIN' && wallet.balance.toNumber() < price) {
      throw new InsuficientBalanceError()
    }

    const ticket = await this.ticketsRepository.create({
      walletId: wallet.id,
      price,
    })

    await this.walletsRepository.updateBalance({
      walletId: wallet.id,
      amount: -price,
    })

    return { ticket }
  }
}
