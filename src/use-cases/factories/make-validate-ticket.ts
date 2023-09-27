import { PrismaTicketsRepository } from '@/repositories/prisma/prisma-tickets-repository'
import { ValidateUseCase } from '../validate'

export function makeValidateTicket() {
  const ticketsRepository = new PrismaTicketsRepository()
  const useCase = new ValidateUseCase(ticketsRepository)
  return useCase
}
