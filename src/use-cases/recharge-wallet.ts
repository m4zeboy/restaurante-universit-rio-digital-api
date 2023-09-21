import { WalletRecharge } from '@prisma/client'
import { WalletsRepository } from '@/repositories/wallets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { WalletRechargesRepository } from '@/repositories/wallet-recharges-repository'
import { InvalidRechargeAmountError } from './errors/invalid-recharge-amount'

interface RechargeWalletUseCaseRequest {
  userId: string
  amount: number
}

interface RechargeWalletUseCaseReply {
  walletRecharge: WalletRecharge
}

export class RechargeWalletUseCase {
  constructor(
    private walletsRepository: WalletsRepository,
    private usersRepository: UsersRepository,
    private walletRechargesRepository: WalletRechargesRepository,
  ) { }

  async execute(
    data: RechargeWalletUseCaseRequest,
  ): Promise<RechargeWalletUseCaseReply> {
    const doesUserExist = await this.usersRepository.findById(data.userId)

    if (!doesUserExist) {
      throw new ResourceNotFoundError()
    }

    const wallet = await this.walletsRepository.findByUserId(data.userId)

    if (!wallet) {
      throw new ResourceNotFoundError()
    }

    if (data.amount <= 0) {
      throw new InvalidRechargeAmountError()
    }

    const walletRecharge = await this.walletRechargesRepository.create({
      amount: data.amount,
      walletId: wallet.id,
    })

    await this.walletsRepository.updateBalance({
      walletId: wallet.id,
      amount: data.amount,
    })

    return { walletRecharge }
  }
}
