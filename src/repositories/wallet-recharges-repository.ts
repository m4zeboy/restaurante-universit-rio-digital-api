import { WalletRecharge } from '@prisma/client'

export interface WalletRechargesRepository {
  create(data: { amount: number; walletId: string }): Promise<WalletRecharge>
  // findByUserId(userId: string): Promise<Wallet | null>
}
