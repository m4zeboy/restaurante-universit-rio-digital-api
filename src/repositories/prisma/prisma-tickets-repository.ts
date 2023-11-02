import { TicketsRepository } from '../tickets-repository'
import { Ticket } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaTicketsRepository implements TicketsRepository {
  async create(data: { walletId: string; price: number }) {
    const item = await prisma.ticket.create({
      data: { wallet_id: data.walletId, price: data.price },
    })
    return item
  }

  async findById(ticketId: string) {
    const item = await prisma.ticket.findUnique({ where: { id: ticketId } })
    return item
  }

  async findManyByWalletId(walletId: string) {
    const items = await prisma.ticket.findMany({
      where: { wallet_id: walletId },
      orderBy: {
        purchased_at: 'desc',
      },
    })
    return items
  }

  async save(ticket: Ticket): Promise<void> {
    await prisma.ticket.update({
      where: { id: ticket.id },
      data: ticket,
    })
  }
}
