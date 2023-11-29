import { Prisma, $Enums } from '@prisma/client'
import { CreatePaymentData, PaymentRepository } from '../payment-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPaymentRepository implements PaymentRepository {
  async findById(id: string) {
    const item = await prisma.rechargePayment.findUnique({ where: { id } })
    return item
  }

  async setPaymentMethod({
    id,
    type,
  }: {
    id: string
    type: $Enums.RechargePaymentType
  }) {
    const item = await prisma.rechargePayment.update({
      where: {
        id,
      },
      data: {
        type,
      },
    })
    return item
  }

  async updateStatus(data: { id: string; status: 'APPROVED' | 'CANCELED' }) {
    const updatedPayment = await prisma.rechargePayment.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    })
    return updatedPayment
  }

  async create(data: CreatePaymentData) {
    const payment = await prisma.rechargePayment.create({
      data: {
        amount: data.amount,
        recharge: {
          connect: {
            id: data.walletRechargeId,
          },
        },
        type: data.type,
      },
    })
    return payment
  }
}
