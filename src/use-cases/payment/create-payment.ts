import { WalletRechargesRepository } from '@/repositories/wallet-recharges-repository'
import { RechargePayment } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { PaymentRepository } from '@/repositories/payment-repository'

interface CreatePaymentUseCaseRequest {
  walletRechargeId: string
  amount: number
}

interface CreatePaymentUseCaseReply {
  payment: RechargePayment
}

export class CreatePaymentUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private rechargeRepository: WalletRechargesRepository,
  ) { }

  async execute(
    data: CreatePaymentUseCaseRequest,
  ): Promise<CreatePaymentUseCaseReply> {
    const recharge = await this.rechargeRepository.findById(
      data.walletRechargeId,
    )
    if (!recharge) {
      throw new ResourceNotFoundError()
    }
    // create payment
    const payment = await this.paymentRepository.create(data)
    return { payment }
  }
}
