import { randomUUID } from 'node:crypto'
import { TicketsRepository } from '../tickets-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { Ticket } from '@prisma/client'

export class InMemoryTicketsRepository implements TicketsRepository {
  public items: Ticket[] = []
  async save(ticket: Ticket): Promise<void> {
    const ticketIndex = this.items.findIndex((item) => item.id === ticket.id)
    if (ticketIndex >= 0) {
      this.items[ticketIndex] = ticket
    }
  }

  async findById(ticketId: string) {
    const item = this.items.find((item) => item.id === ticketId)
    if (!item) return null
    return item
  }

  async findManyByWalletId(walletId: string) {
    const items = this.items.filter((item) => item.wallet_id === walletId)
    return items
  }

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
