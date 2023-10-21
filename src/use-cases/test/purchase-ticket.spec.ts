import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository'
import { InMemoryTicketsRepository } from '@/repositories/in-memory/in-memory-tickets-repository'
import { PurchaseTicketUseCase } from '../purchase-ticket'
import { InMemoryStudentsRepository } from '@/repositories/in-memory/in-memory-students-repository'

let usersRepository: InMemoryUsersRepository
let walletsRepository: InMemoryWalletsRepository
let ticketsRepository: InMemoryTicketsRepository
let studentsRepository: InMemoryStudentsRepository

let sut: PurchaseTicketUseCase

describe('Purchase Ticket Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    walletsRepository = new InMemoryWalletsRepository()
    ticketsRepository = new InMemoryTicketsRepository()
    studentsRepository = new InMemoryStudentsRepository()
    sut = new PurchaseTicketUseCase(
      walletsRepository,
      usersRepository,
      ticketsRepository,
      studentsRepository,
    )
  })

  it('should be able to purchase ticket', async () => {
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

    const { ticket } = await sut.execute({
      userId: 'user-1',
    })

    expect(ticket.id).toEqual(expect.any(String))
  })

  it('should not be able to purchase a ticket with insufficient balance', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: 'password_hash',
      role: 'USER',
    })

    await walletsRepository.create({
      userId: 'user-1',
    })

    await expect(() =>
      sut.execute({
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should update the wallet balance after a ticket purchase', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: 'password_hash',
      role: 'STUDENT',
    })

    await walletsRepository.create({
      id: 'wallet-1',
      userId: 'user-1',
    })

    let wallet = await walletsRepository.updateBalance({
      walletId: 'wallet-1',
      amount: 50,
    })

    const { ticket } = await sut.execute({
      userId: 'user-1',
    })
    wallet = await walletsRepository.findByUserId('user-1')
    expect(ticket.id).toEqual(expect.any(String))
    expect(wallet?.balance.toNumber()).toEqual(50 - 15)
  })

  it('should be able for a student eligible for the scholarship to pay less', async () => {
    await studentsRepository.create({
      rga: '2023.XXXX.XXX-X',
      passport: 'john.doe',
      uniqueRegister: 'XXXXXXXXXX',
    })

    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: 'password_hash',
      role: 'STUDENT',
    })

    await walletsRepository.create({
      id: 'wallet-1',
      userId: 'user-1',
    })

    await walletsRepository.updateBalance({
      walletId: 'wallet-1',
      amount: 50,
    })

    const { ticket } = await sut.execute({
      userId: 'user-1',
    })

    const wallet = await walletsRepository.findByUserId('user-1')
    expect(ticket.id).toEqual(expect.any(String))
    expect(wallet?.balance.toNumber()).toEqual(50 - 3)
  })
})
