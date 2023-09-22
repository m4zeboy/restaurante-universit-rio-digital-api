import { PrismaWalletsRepository } from '@/repositories/prisma/prisma-wallets-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaTicketsRepository } from '@/repositories/prisma/prisma-tickets-repository'
import { FetchPurchasedTicketsUseCase } from '../fetch-purchased-tickets'

export function makeListPurchasedTickets() {
  const walletsRepository = new PrismaWalletsRepository()
  const usersRepository = new PrismaUsersRepository()
  const ticketsRepository = new PrismaTicketsRepository()
  const useCase = new FetchPurchasedTicketsUseCase(
    walletsRepository,
    usersRepository,
    ticketsRepository,
  )
  return useCase
}
