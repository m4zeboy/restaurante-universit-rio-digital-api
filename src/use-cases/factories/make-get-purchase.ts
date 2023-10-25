import { PrismaTicketsRepository } from '@/repositories/prisma/prisma-tickets-repository'
import { GetPurchaseUseCase } from '../get-purchase'

export function makeGetPurchase() {
  const ticketsRepository = new PrismaTicketsRepository()
  const useCase = new GetPurchaseUseCase(ticketsRepository)
  return useCase
}
