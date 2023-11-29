import { $Enums, RechargePayment } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { CreatePaymentData, PaymentRepository } from '../payment-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPaymentRepository implements PaymentRepository {
  public items: RechargePayment[] = []

  async findById(id: string): Promise<{
    id: string
    wallet_recharge_id: string
    amount: Decimal
    status: $Enums.RechargePaymentStatus
    type: $Enums.RechargePaymentType
    name_in_card: string | null
    card_number: string | null
    expiration_date: Date | null
    cvc: number | null
    qr_code: string | null
  } | null> {
    const item = this.items.find((item) => item.id === id)
    if (!item) return null
    return item
  }

  async setPaymentMethod({
    id,
    type,
  }: {
    id: string
    type: $Enums.RechargePaymentType
  }) {
    const item = this.items.find((item) => item.id === id)
    if (!item) {
      return null
    }
    item.type = type
    return item
  }

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
