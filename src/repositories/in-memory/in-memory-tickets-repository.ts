import { randomUUID } from 'node:crypto'
import { TicketsRepository } from '../tickets-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { Ticket } from '@prisma/client'

export class InMemoryTicketsRepository implements TicketsRepository {
  public items: Ticket[] = []
  async create(data: { walletId: string; price: number }) {
    const ticket: Ticket = {
      id: randomUUID(),
      price: new Decimal(data.price),
      purchased_at: new Date(),
      wallet_id: data.walletId,
      validated_at: null,
    }
    this.items.push(ticket)
    return ticket
  }
}
