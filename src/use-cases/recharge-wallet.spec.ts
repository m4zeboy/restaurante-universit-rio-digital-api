import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository'
import { InMemoryWalletRechargesRepository } from '@/repositories/in-memory/in-memory-wallet-recharges-repository'
import { RechargeWalletUseCase } from './recharge-wallet'

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
})
