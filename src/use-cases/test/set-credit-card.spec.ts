import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPaymentRepository } from '@/repositories/in-memory/in-memory-payment-repository'
import { SetCreditCardUseCase } from '../payment/set-credit-card'

let paymentRepository: InMemoryPaymentRepository
let sut: SetCreditCardUseCase

describe('Set Credit card Use Case', () => {
  beforeEach(() => {
    paymentRepository = new InMemoryPaymentRepository()
    sut = new SetCreditCardUseCase(paymentRepository)
  })

  it('should be able to set credit card data for a credit card payment', async () => {
    const { id } = await paymentRepository.create({
      amount: 100,
      walletRechargeId: 'recharge-1',
    })

    await paymentRepository.setPaymentMethod({
      id,
      type: 'CREDIT_CARD',
    })

    const { payment } = await sut.execute({
      paymentId: id,
      card_number: '1234 1234 1234 1234',
      cvc: '222',
      expiration_date: '2030-05-01',
      name_in_card: 'JOHN DOE',
    })
    expect(payment?.id).toEqual(expect.any(String))
    expect(payment?.type).toEqual('CREDIT_CARD')
    expect(payment?.card_number).toEqual(expect.any(String))
  })
})
