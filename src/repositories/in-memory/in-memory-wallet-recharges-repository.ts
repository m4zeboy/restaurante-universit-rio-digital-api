import { WalletRecharge } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'
import { WalletRechargesRepository } from '../wallet-recharges-repository'

export class InMemoryWalletRechargesRepository
  implements WalletRechargesRepository {
  public items: WalletRecharge[] = []
  async create(data: { amount: number; walletId: string }) {
    const item: WalletRecharge = {
      id: randomUUID(),
      amount: new Decimal(data.amount),
      created_at: new Date(),
      wallet_id: data.walletId,
    }

    this.items.push(item)
    return item
  }
}
