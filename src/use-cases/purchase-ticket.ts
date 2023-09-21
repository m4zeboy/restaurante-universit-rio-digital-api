import { Ticket } from '@prisma/client'
import { WalletsRepository } from '@/repositories/wallets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { TicketsRepository } from '@/repositories/tickets-repository'
import { StudentsRepository } from '@/repositories/students-repository'
import { CheckDiscountEligibilityUseCase } from './check-discount-eligibility'

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

    // verify the price of the ticket according to the user
    let PRICE = 15

    const checkDiscountEligibilityUseCase = new CheckDiscountEligibilityUseCase(
      this.studentsRepository,
    )

    const { isEligible } = await checkDiscountEligibilityUseCase.execute({
      user,
    })
    isEligible ? (PRICE = 3) : (PRICE = 15)
    // verify if the user has enough balance in the wallet

    if (wallet.balance.toNumber() < PRICE) {
      throw new Error('Insuficient balance')
    }

    const ticket = await this.ticketsRepository.create({
      walletId: wallet.id,
      price: PRICE,
    })
    // update the balance in the wallet
    await this.walletsRepository.updateBalance({
      walletId: wallet.id,
      amount: -PRICE,
    })

    return { ticket }
  }
}
