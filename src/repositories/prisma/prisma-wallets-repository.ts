import { Wallet } from '@prisma/client'
import { WalletsRepository } from '../wallets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaWalletsRepository implements WalletsRepository {
  async create(data: { id?: string; userId: string }) {
    const item = await prisma.wallet.create({
      data: { user_id: data.userId, balance: 0 },
    })
    return item
  }

  async updateBalance(data: { walletId: string; amount: number }) {
    const { walletId, amount } = data
    const item = await prisma.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    })

    return item
  }

  async findByUserId(userId: string) {
    const item = await prisma.wallet.findUnique({ where: { user_id: userId } })
    return item
  }
}
