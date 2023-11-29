import { $Enums, RechargePayment } from '@prisma/client'

export interface CreatePaymentData {
  walletRechargeId: string
  amount: number
}

export interface PaymentRepository {
  create(data: CreatePaymentData): Promise<RechargePayment>

  updateStatus(data: {
    id: string
    status: $Enums.RechargePaymentStatus
  }): Promise<RechargePayment | null>
}
