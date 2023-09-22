import { Ticket } from '@prisma/client'

export interface TicketsRepository {
  create(data: { walletId: string; price: number }): Promise<Ticket>
  findManyByWalletId(walletId: string): Promise<Ticket[]>
  findById(ticketId: string): Promise<Ticket | null>
  save(ticket: Ticket): Promise<void>
}
