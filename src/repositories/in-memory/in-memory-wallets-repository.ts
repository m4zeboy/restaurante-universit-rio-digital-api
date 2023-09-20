import { Student, Wallet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { StudentsRepository } from '../students-repository'
import { WalletsRepository } from '../wallets-repository'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryWalletsRepository implements WalletsRepository {
  public items: Wallet[] = []
  async create(data: { userId: string }) {
    const item: Wallet = {
      id: randomUUID(),
      balance: new Decimal(0),
      user_id: data.userId,
    }
    this.items.push(item)
    return item
  }

  async findByUserId(userId: string) {
    const wallet = this.items.find((item) => item.user_id === userId)
    if (!wallet) return null
    return wallet
  }
}
