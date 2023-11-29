import { $Enums, RechargePayment } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { PaymentRepository } from '@/repositories/payment-repository'

interface SetPaymentMethodUseCaseRequest {
  paymentId: string
  paymentMethod: $Enums.RechargePaymentType
}

interface SetPaymentMethodUseCaseReply {
  payment: RechargePayment | null
}

export class SetPaymentMethodUseCase {
  constructor(private paymentRepository: PaymentRepository) { }

  async execute(
    data: SetPaymentMethodUseCaseRequest,
  ): Promise<SetPaymentMethodUseCaseReply> {
    const doesPaymentExists = await this.paymentRepository.findById(
      data.paymentId,
    )
    if (!doesPaymentExists) {
      throw new ResourceNotFoundError()
    }
    const payment = await this.paymentRepository.setPaymentMethod({
      id: data.paymentId,
      type: data.paymentMethod,
    })
    return { payment }
  }
}
