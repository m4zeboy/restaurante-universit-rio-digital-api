import { PrismaWalletsRepository } from '@/repositories/prisma/prisma-wallets-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PurchaseTicketUseCase } from '../purchase-ticket'
import { PrismaTicketsRepository } from '@/repositories/prisma/prisma-tickets-repository'
import { PrismaStudentsRepository } from '@/repositories/prisma/prisma-students-repository'

export function makePurchaseTicket() {
  const walletsRepository = new PrismaWalletsRepository()
  const usersRepository = new PrismaUsersRepository()
  const ticketsRepository = new PrismaTicketsRepository()
  const studentsRepository = new PrismaStudentsRepository()
  const useCase = new PurchaseTicketUseCase(
    walletsRepository,
    usersRepository,
    ticketsRepository,
    studentsRepository,
  )
  return useCase
}
