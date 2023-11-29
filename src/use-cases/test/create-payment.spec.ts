import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryWalletRechargesRepository } from '@/repositories/in-memory/in-memory-wallet-recharges-repository'
import { CreatePaymentUseCase } from '../payment/create-payment'
import { InMemoryPaymentRepository } from '@/repositories/in-memory/in-memory-payment-repository'

let walletRechargesRepository: InMemoryWalletRechargesRepository
let paymentRepository: InMemoryPaymentRepository
let sut: CreatePaymentUseCase

describe('Create Payment Use Case', () => {
  beforeEach(() => {
    walletRechargesRepository = new InMemoryWalletRechargesRepository()
    paymentRepository = new InMemoryPaymentRepository()
    sut = new CreatePaymentUseCase(paymentRepository, walletRechargesRepository)
  })

  it('should be able to create a payment', async () => {
    const { id: walletRechargeId, requested_amount: amount } =
      await walletRechargesRepository.create({
        walletId: 'wallet-1',
        requestedAmount: 100,
      })

    const { payment } = await sut.execute({
      walletRechargeId,
      amount: amount.toNumber(),
    })
    expect(payment.id).toEqual(expect.any(String))
  })
})
