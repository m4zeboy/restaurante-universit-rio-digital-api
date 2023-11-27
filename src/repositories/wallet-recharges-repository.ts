import { WalletRecharge } from '@prisma/client'

export interface WalletRechargesRepository {
  create(data: {
    requestedAmount: number
    walletId: string
  }): Promise<WalletRecharge>
  findById(id: string): Promise<WalletRecharge | null>
  // findByUserId(userId: string): Promise<Wallet | null>
}
