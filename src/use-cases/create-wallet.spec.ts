import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository'
import { CreateWalletUseCase } from './create-wallet'

let usersRepository: InMemoryUsersRepository
let walletsRepository: InMemoryWalletsRepository
let sut: CreateWalletUseCase

describe('Create Wallet Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    walletsRepository = new InMemoryWalletsRepository()
    sut = new CreateWalletUseCase(walletsRepository, usersRepository)
  })

  it('should be able to create a wallet', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: 'password_hash',
      role: 'STUDENT',
    })
    const { wallet } = await sut.execute({
      userId: 'user-1',
    })
    expect(wallet.id).toEqual(expect.any(String))
  })
})
