import { RechargePayment } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { PaymentRepository } from '@/repositories/payment-repository'

interface SetCreditCardUseCaseRequest {
  paymentId: string
  name_in_card: string
  card_number: string
  expiration_date: string
  cvc: number
}

interface SetCreditCardUseCaseReply {
  payment: RechargePayment | null
}

export class SetCreditCardUseCase {
  constructor(private paymentRepository: PaymentRepository) { }

  async execute(
    data: SetCreditCardUseCaseRequest,
  ): Promise<SetCreditCardUseCaseReply> {
    const doesPaymentExists = await this.paymentRepository.findById(
      data.paymentId,
    )
    if (!doesPaymentExists) {
      throw new ResourceNotFoundError()
    }

    const { type } = doesPaymentExists
    if (type !== 'CREDIT_CARD') {
      throw new Error('This payment is not a credit card payment.')
    }

    const payment = await this.paymentRepository.setCreditCard(data)
    return { payment }
  }
}
