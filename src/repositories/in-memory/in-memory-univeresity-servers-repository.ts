import { UniversityServer } from '@prisma/client'
import { UniversityServersRepository } from '../university-servers-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUniversityServersRepository
  implements UniversityServersRepository {
  public items: UniversityServer[] = []

  async create(data: { userId: string; siape: string }) {
    const item: UniversityServer = {
      id: randomUUID(),
      siape: data.siape,
      user_id: data.userId,
    }

    this.items.push(item)

    return item
  }

  async findBySiape(siape: string) {
    const item = this.items.find((item) => item.siape === siape)
    if (!item) return null
    return item
  }
}
