import { PrismaPaymentRepository } from '@/repositories/prisma/prisma-payment-repository'
import { SetCreditCardUseCase } from '../payment/set-credit-card'

export function makeSetCreditCard() {
  const paymentRepository = new PrismaPaymentRepository()
  const useCase = new SetCreditCardUseCase(paymentRepository)
  return useCase
}
