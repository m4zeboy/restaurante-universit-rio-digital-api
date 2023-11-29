import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPaymentRepository } from '@/repositories/in-memory/in-memory-payment-repository'
import { SetPaymentMethodUseCase } from '../payment/set-payment-method'

let paymentRepository: InMemoryPaymentRepository
let sut: SetPaymentMethodUseCase

describe('Set Payment Method Use Case', () => {
  beforeEach(() => {
    paymentRepository = new InMemoryPaymentRepository()
    sut = new SetPaymentMethodUseCase(paymentRepository)
  })

  it('should be able to set CREDIT CARD as payment method', async () => {
    const { id } = await paymentRepository.create({
      amount: 100,
      walletRechargeId: 'recharge-1',
    })

    const { payment } = await sut.execute({
      paymentId: id,
      paymentMethod: 'CREDIT_CARD',
    })
    expect(payment?.id).toEqual(expect.any(String))
    expect(payment?.type).toEqual('CREDIT_CARD')
  })

  it('should be able to set PIX as payment method', async () => {
    const { id } = await paymentRepository.create({
      amount: 100,
      walletRechargeId: 'recharge-1',
    })

    const { payment } = await sut.execute({
      paymentId: id,
      paymentMethod: 'PIX',
    })
    expect(payment?.id).toEqual(expect.any(String))
    expect(payment?.type).toEqual('PIX')
  })
})
