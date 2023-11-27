import { RechargePayment } from '@prisma/client'
import { PaymentStrategy } from './payment-strategy'
import { validCreditCards } from '@/utils/valid-credit-cards'
import { prisma } from '@/lib/prisma'

export interface CreditCardData {
  name_in_card: string
  card_number: string
  expiration_date: string
  cvc: number
}

export class CreditCardPayment implements PaymentStrategy {
  private creditCard: CreditCardData
  private payment: RechargePayment
  constructor(creditCard: CreditCardData, payment: RechargePayment) {
    this.creditCard = creditCard
    this.payment = payment
  }

  validateCreditCard() {
    if (!validCreditCards.includes(this.creditCard.card_number)) {
      throw new Error('Invalid credit card.')
    }
  }

  async pay(amount: number) {
    try {
      this.validateCreditCard()
      await prisma.rechargePayment.update({
        where: {
          id: this.payment.id,
        },
        data: {
          status: 'APPROVED',
        },
      })
    } catch (err) {
      await prisma.rechargePayment.update({
        where: {
          id: this.payment.id,
        },
        data: {
          status: 'CANCELED',
        },
      })
      throw err
    }
  }
}
