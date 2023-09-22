import { prisma } from '@/lib/prisma'
import { UniversityServersRepository } from '../university-servers-repository'

export class PrismaUniversityServersRepository
  implements UniversityServersRepository {
  async create(data: { siape: string; passport: string }) {
    const item = await prisma.universityServer.create({ data })
    return item
  }

  async findBySiape(siape: string) {
    const item = await prisma.universityServer.findUnique({ where: { siape } })
    return item
  }

  async findByPassport(passport: string) {
    const item = await prisma.universityServer.findUnique({
      where: { passport },
    })
    return item
  }
}
