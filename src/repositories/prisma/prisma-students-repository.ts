import { prisma } from '@/lib/prisma'
import { StudentsRepository } from '../students-repository'

export class PrismaStudentsRepository implements StudentsRepository {
  async create(data: {
    rga: string
    uniqueRegister?: string | undefined
    passport: string
  }) {
    const item = await prisma.student.create({ data })
    return item
  }

  async findByRga(rga: string) {
    const item = await prisma.student.findUnique({ where: { rga } })
    return item
  }

  async findByPassport(passport: string) {
    const item = await prisma.student.findUnique({ where: { passport } })
    return item
  }
}
