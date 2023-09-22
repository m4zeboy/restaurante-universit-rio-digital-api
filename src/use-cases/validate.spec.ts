import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryTicketsRepository } from '@/repositories/in-memory/in-memory-tickets-repository'
import { ValidateUseCase } from './validate'
import { ResourceNotFoundError } from './errors/resource-not-found'

let ticketsRepository: InMemoryTicketsRepository
let sut: ValidateUseCase

describe('Validate Ticket Use Case', () => {
  beforeEach(() => {
    ticketsRepository = new InMemoryTicketsRepository()
    sut = new ValidateUseCase(ticketsRepository)
  })

  it('should be able to validate ticket', async () => {
    const ticket = await ticketsRepository.create({
      walletId: 'wallet-1',
      price: 15,
    })

    const { validatedTicket } = await sut.execute({
      ticketId: ticket.id,
    })

    expect(validatedTicket.validated_at).toEqual(expect.any(Date))
  })
  it('should not be able to validate a non-existent ticket', async () => {
    await expect(() =>
      sut.execute({
        ticketId: 'non-existent-ticket-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate a ticket twice', async () => {
    const { id: ticketId } = await ticketsRepository.create({
      walletId: 'wallet-1',
      price: 15,
    })

    await sut.execute({
      ticketId,
    })

    await expect(() =>
      sut.execute({
        ticketId,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
