import { Prisma, RechargePayment } from '@prisma/client'

export interface CreatePaymentData {
  walletRechargeId: string
  amount: number
  type: 'CREDIT_CARD' | 'PIX'
}

export interface PaymentRepository {
  create(data: CreatePaymentData): Promise<RechargePayment>

  updateStatus(data: {
    id: string
    status: 'APPROVED' | 'CANCELED'
  }): Promise<RechargePayment>
}
