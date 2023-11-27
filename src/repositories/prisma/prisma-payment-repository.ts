import { Prisma, $Enums } from '@prisma/client'
import { CreatePaymentData, PaymentRepository } from '../payment-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPaymentRepository implements PaymentRepository {
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
