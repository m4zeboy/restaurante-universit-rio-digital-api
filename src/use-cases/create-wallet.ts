import { Wallet } from '@prisma/client'
import { WalletsRepository } from '@/repositories/wallets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { WalletAlreadyExistsError } from './errors/wallet-already-exists'

interface CreateWalletUseCaseRequest {
  userId: string
}

interface CreateWalletUseCaseReply {
  wallet: Wallet
}

export class CreateWalletUseCase {
  constructor(
    private walletsRepository: WalletsRepository,
    private usersRepository: UsersRepository,
  ) { }

  async execute(
    data: CreateWalletUseCaseRequest,
  ): Promise<CreateWalletUseCaseReply> {
    const doesUserExist = await this.usersRepository.findById(data.userId)

    if (!doesUserExist) {
      throw new ResourceNotFoundError()
    }

    const doesWalletAlreadyExist = await this.walletsRepository.findByUserId(
      data.userId,
    )

    if (doesWalletAlreadyExist) {
      throw new WalletAlreadyExistsError()
    }

    const wallet = await this.walletsRepository.create({ userId: data.userId })

    return { wallet }
  }
}
