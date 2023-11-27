import { prisma } from '@/lib/prisma'
import { WalletRechargesRepository } from '../wallet-recharges-repository'

export class PrismaWalletRechargesRepository
  implements WalletRechargesRepository {
  async findById(id: string) {
    const recharge = await prisma.walletRecharge.findUnique({ where: { id } })
    return recharge
  }

  async create(data: { requestedAmount: number; walletId: string }) {
    const item = await prisma.walletRecharge.create({
      data: {
        requested_amount: data.requestedAmount,
        wallet_id: data.walletId,
      },
    })

    return item
  }
}
