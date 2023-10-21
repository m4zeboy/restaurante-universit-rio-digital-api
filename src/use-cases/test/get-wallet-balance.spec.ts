import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository'
import { GetWalletBalanceUseCase } from '../get-wallet-balance'
import { Decimal } from '@prisma/client/runtime/library'

let usersRepository: InMemoryUsersRepository
let walletsRepository: InMemoryWalletsRepository
let sut: GetWalletBalanceUseCase

describe('Get Wallet Balance Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    walletsRepository = new InMemoryWalletsRepository()
    sut = new GetWalletBalanceUseCase(walletsRepository, usersRepository)
  })

  it('should be able to get wallet balance', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: 'password_hash',
      role: 'STUDENT',
    })

    await walletsRepository.create({ userId: 'user-1' })

    const { balance } = await sut.execute({ userId: 'user-1' })
    expect(balance.toNumber()).toEqual(0)
  })
})
