import { UniversityServer } from '@prisma/client'
import { UniversityServersRepository } from '../university-servers-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUniversityServersRepository
  implements UniversityServersRepository {
  public items: UniversityServer[] = []

  async create(data: { siape: string; passport: string }) {
    const item: UniversityServer = {
      id: randomUUID(),
      siape: data.siape,
      passport: data.passport,
    }

    this.items.push(item)

    return item
  }

  async findBySiape(siape: string) {
    const item = this.items.find((item) => item.siape === siape)
    if (!item) return null
    return item
  }

  async findByPassport(passport: string) {
    const item = this.items.find((item) => item.passport === passport)
    if (!item) return null
    return item
  }
}
