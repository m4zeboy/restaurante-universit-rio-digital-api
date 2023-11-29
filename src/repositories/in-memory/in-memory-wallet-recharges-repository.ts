import { $Enums, WalletRecharge } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'
import { WalletRechargesRepository } from '../wallet-recharges-repository'

export class InMemoryWalletRechargesRepository
  implements WalletRechargesRepository {
  public items: WalletRecharge[] = []
  async findById(id: string) {
    const item = this.items.find((item) => item.id === id)
    if (!item) return null
    return item
  }

  async create(data: { requestedAmount: number; walletId: string }) {
    const item: WalletRecharge = {
      id: randomUUID(),
      requested_amount: new Decimal(data.requestedAmount),
      created_at: new Date(),
      wallet_id: data.walletId,
      status: 'REQUESTED',
    }

    this.items.push(item)
    return item
  }
}
