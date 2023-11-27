import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository'
import { InMemoryWalletRechargesRepository } from '@/repositories/in-memory/in-memory-wallet-recharges-repository'
import { RechargeWalletUseCase } from '../request-recharge'
import { InvalidRechargeAmountError } from '../errors/invalid-recharge-amount'

let usersRepository: InMemoryUsersRepository
let walletsRepository: InMemoryWalletsRepository
let walletRechargesRepository: InMemoryWalletRechargesRepository
let sut: RechargeWalletUseCase

describe('Recharge Wallet Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    walletsRepository = new InMemoryWalletsRepository()
    walletRechargesRepository = new InMemoryWalletRechargesRepository()
    sut = new RechargeWalletUseCase(
      walletsRepository,
      usersRepository,
      walletRechargesRepository,
    )
  })

  it('should be able to create a wallet recharge', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: 'password_hash',
      role: 'STUDENT',
    })

    await walletsRepository.create({
      userId: 'user-1',
    })

    const { walletRecharge } = await sut.execute({
      userId: 'user-1',
      amount: 50,
    })
    expect(walletRecharge.id).toEqual(expect.any(String))
  })

  it('should update the wallet balance after a wallet recharge', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: 'password_hash',
      role: 'STUDENT',
    })

    await walletsRepository.create({
      userId: 'user-1',
    })

    const { walletRecharge } = await sut.execute({
      userId: 'user-1',
      amount: 50,
    })

    expect(walletRecharge.id).toEqual(expect.any(String))

    const wallet = await walletsRepository.findByUserId('user-1')
    expect(wallet?.balance.toNumber()).toEqual(50)
  })

  it('should not be able to create a wallet with amount less than or equal to zero', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: 'password_hash',
      role: 'STUDENT',
    })

    await walletsRepository.create({
      userId: 'user-1',
    })

    await expect(() =>
      sut.execute({
        userId: 'user-1',
        amount: 0,
      }),
    ).rejects.toBeInstanceOf(InvalidRechargeAmountError)
  })
})
