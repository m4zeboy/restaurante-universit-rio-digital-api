import { WalletRechargesRepository } from '@/repositories/wallet-recharges-repository'
import { RechargePayment } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { prisma } from '@/lib/prisma'
import { PaymentContext } from './payment-context'
import { CreditCardPayment } from './credit-card-paayment'
import { PixPayment } from './pix-payment'

interface CreatePaymentUseCaseRequest {
  walletRechargeId: string
  amount: number
  type: 'CREDIT_CARD' | 'PIX'
  name_in_card?: string
  card_number?: string
  expiration_date?: string
  cvc?: number
}

interface CreatePaymentUseCaseReply {
  payment: RechargePayment | null
}

export class CreatePaymentUseCase {
  constructor(private rechargeRepository: WalletRechargesRepository) { }

  async execute(
    data: CreatePaymentUseCaseRequest,
  ): Promise<CreatePaymentUseCaseReply> {
    const recharge = await prisma.rechargePayment.findUnique({
      where: { id: data.walletRechargeId },
    })
    if (!recharge) {
      throw new ResourceNotFoundError()
    }
    // create payment
    const paymentCreated = {}

    const paymentContext = new PaymentContext()
    // set payment strategy
    if (data.type === 'CREDIT_CARD') {
      const creditCard = {
        card_number: data.card_number!,
        cvc: data.cvc!,
        expiration_date: data.expiration_date!,
        name_in_card: data.name_in_card!,
      }
      paymentContext.setStrategy(
        new CreditCardPayment(creditCard, paymentCreated),
      )
    }
    if (data.type === 'PIX') {
      paymentContext.setStrategy(new PixPayment())
    }
    try {
      await paymentContext.execute(data.amount)
      const paymentUpdated = await prisma.rechargePayment.findUnique({
        where: { id: paymentCreated.id },
      })
      return { payment: paymentUpdated }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
