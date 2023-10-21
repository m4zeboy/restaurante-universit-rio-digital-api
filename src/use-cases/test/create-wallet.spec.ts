import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository'
import { CreateWalletUseCase } from '../create-wallet'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { WalletAlreadyExistsError } from '../errors/wallet-already-exists'

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

  it('should not be able to create a wallet with non-existent userId', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existent-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to create a wallet with same userId twice', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: 'password_hash',
      role: 'STUDENT',
    })
    await sut.execute({
      userId: 'user-1',
    })
    await expect(() =>
      sut.execute({
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(WalletAlreadyExistsError)
  })
})
