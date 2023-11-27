import { Prisma, $Enums } from '@prisma/client'
import { CreatePaymentData, PaymentRepository } from '../payment-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPaymentRepository implements PaymentRepository {
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
