import { PrismaPaymentRepository } from '@/repositories/prisma/prisma-payment-repository'
import { SetPaymentMethodUseCase } from '../payment/set-payment-method'

export function makeSetPaymentMethod() {
  const paymentRepository = new PrismaPaymentRepository()
  const useCase = new SetPaymentMethodUseCase(paymentRepository)
  return useCase
}
