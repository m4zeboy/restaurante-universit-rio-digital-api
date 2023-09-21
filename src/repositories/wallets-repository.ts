import { Wallet } from '@prisma/client'

export interface WalletsRepository {
  create(data: { userId: string }): Promise<Wallet>
  findByUserId(userId: string): Promise<Wallet | null>
  updateBalance(data: {
    walletId: string
    amount: number
  }): Promise<Wallet | null>
}
