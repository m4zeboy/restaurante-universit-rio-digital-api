import { prisma } from '@/lib/prisma'
import { WalletRechargesRepository } from '../wallet-recharges-repository'

export class PrismaWalletRechargesRepository
  implements WalletRechargesRepository {
  async create(data: { amount: number; walletId: string }) {
    const item = await prisma.walletRecharge.create({
      data: { amount: data.amount, wallet_id: data.walletId },
    })

    return item
  }
}
