import { PrismaPaymentRepository } from '@/repositories/prisma/prisma-payment-repository'
import { CreatePaymentUseCase } from '../payment/create-payment'
import { PrismaWalletRechargesRepository } from '@/repositories/prisma/prisma-wallet-recharges'

export function makeCreatePayment() {
  const paymentRepository = new PrismaPaymentRepository()
  const rechargeRepository = new PrismaWalletRechargesRepository()
  const useCase = new CreatePaymentUseCase(
    paymentRepository,
    rechargeRepository,
  )
  return useCase
}
