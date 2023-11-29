import { $Enums, RechargePayment } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { CreatePaymentData, PaymentRepository } from '../payment-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPaymentRepository implements PaymentRepository {
  public items: RechargePayment[] = []
  async create(data: CreatePaymentData) {
    const item: RechargePayment = {
      id: randomUUID(),
      amount: new Decimal(data.amount),
      type: data.type,
      wallet_recharge_id: data.walletRechargeId,
      card_number: null,
      cvc: null,
      expiration_date: null,
      name_in_card: null,
      qr_code: null,
      status: 'PENDING',
    }
    this.items.push(item)
    return item
  }

  async updateStatus(data: {
    id: string
    status: $Enums.RechargePaymentStatus
  }) {
    const item = this.items.find((item) => item.id === data.id)
    if (!item) {
      return null
    }
    item.status = data.status
    return item
  }
}
