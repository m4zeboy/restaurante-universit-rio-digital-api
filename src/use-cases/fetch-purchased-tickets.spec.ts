import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository'
import { InMemoryTicketsRepository } from '@/repositories/in-memory/in-memory-tickets-repository'
import { FetchPurchasesTicketsUseCase } from './fetch-purchased-tickets'

let usersRepository: InMemoryUsersRepository
let walletsRepository: InMemoryWalletsRepository
let ticketsRepository: InMemoryTicketsRepository

let sut: FetchPurchasesTicketsUseCase

describe('Fetch Purchase Ticket Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    walletsRepository = new InMemoryWalletsRepository()
    ticketsRepository = new InMemoryTicketsRepository()
    sut = new FetchPurchasesTicketsUseCase(
      walletsRepository,
      usersRepository,
      ticketsRepository,
    )
  })

  it('should be able to fetch purchased tickets', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: 'password_hash',
      role: 'USER',
    })

    await walletsRepository.create({
      id: 'wallet-1',
      userId: 'user-1',
    })

    await walletsRepository.updateBalance({
      walletId: 'wallet-1',
      amount: 50,
    })

    await ticketsRepository.create({
      price: 15,
      walletId: 'wallet-1',
    })

    await ticketsRepository.create({
      price: 15,
      walletId: 'wallet-1',
    })

    const { purchasedTickets } = await sut.execute({
      userId: 'user-1',
    })

    expect(purchasedTickets).toHaveLength(2)
  })
})
