import { WalletRechargesRepository } from '@/repositories/wallet-recharges-repository'
import { RechargePayment } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { validCreditCards } from '@/utils/valid-credit-cards'

interface CreditCardData {
  name_in_card: string
  card_number: string
  expiration_date: string
  cvc: number
}

interface CreatePaymentUseCaseRequest {
  walletRechargeId: string
  value: number
  type: 'CREDIT_CARD' | 'PIX'
  creditCard: CreditCardData
}

interface CreatePaymentUseCaseReply {
  payment: RechargePayment
}

interface PaymentStrategy {
  pay(amount: number): void
}

class CreditCardPayment implements PaymentStrategy {
  private creditCard: CreditCardData
  constructor(creditCard: CreditCardData) {
    this.creditCard = creditCard
  }

  validateCreditCard(crediCardNumber: string) {
    if (!validCreditCards.includes(this.creditCard.card_number)) {
      throw new Error('Invalid credit card.')
    }
  }

  async pay(amount: number) {
    try {
      this.validateCreditCard(this.creditCard.card_number)
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export class CreatePaymentUseCase {
  constructor(private rechargeRepository: WalletRechargesRepository) { }

  async execute(
    data: CreatePaymentUseCaseRequest,
  ): Promise<CreatePaymentUseCaseReply> {
    const recharge = {} // TODO: Create method to find a wallet recharge by id
    if (!recharge) {
      throw new ResourceNotFoundError()
    }

    // create payment

    // set payment strategy

    return { isEligible }
  }
}
