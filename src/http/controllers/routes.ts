import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/verify-jwt'
import { balance } from './balance'
import { validate } from './validate'
import { verifyRole } from '../middlewares/verify-role'

export async function appRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get(
    '/wallets/balance',

    balance,
  )

  app.post(
    '/tickets/:ticketId/validate',
    {
      onRequest: async () => verifyRole(['ADMIN']),
    },
    validate,
  )
}
