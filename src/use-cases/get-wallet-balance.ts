import { Wallet } from '@prisma/client'
import { WalletsRepository } from '@/repositories/wallets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { WalletAlreadyExistsError } from './errors/wallet-already-exists'
import { Decimal } from '@prisma/client/runtime/library'

interface GetWalletBalanceUseCaseRequest {
  userId: string
}

interface GetWalletBalanceUseCaseReply {
  balance: Decimal
}

export class GetWalletBalanceUseCase {
  constructor(
    private walletsRepository: WalletsRepository,
    private usersRepository: UsersRepository,
  ) { }

  async execute(
    data: GetWalletBalanceUseCaseRequest,
  ): Promise<GetWalletBalanceUseCaseReply> {
    const doesUserExist = await this.usersRepository.findById(data.userId)

    if (!doesUserExist) {
      throw new ResourceNotFoundError()
    }

    const wallet = await this.walletsRepository.findByUserId(data.userId)

    if (!wallet) {
      throw new ResourceNotFoundError()
    }

    const { balance } = wallet

    return { balance }
  }
}
