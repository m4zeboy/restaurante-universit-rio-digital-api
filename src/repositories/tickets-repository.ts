import { Ticket } from '@prisma/client'

export interface TicketsRepository {
  create(data: { walletId: string; price: number }): Promise<Ticket>
}
