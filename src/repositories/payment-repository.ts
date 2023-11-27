import { Prisma, RechargePayment } from '@prisma/client'

export interface CreatePaymentData {
  walletRechargeId: string
  amount: number
  type: 'CREDIT_CARD' | 'PIX'
}

export interface PaymentRepository {
  create(data: CreatePaymentData): Promise<RechargePayment>

  // findByDate(date: Date): Promise<Dish | null>
}
