import { FastifyInstance } from 'fastify'
import { recharge } from './recharge'
import { verifyJWT } from '../middlewares/verify-jwt'
import { balance } from './balance'
import { purchase } from './purchase'
import { validate } from './validate'
import { verifyRole } from '../middlewares/verify-role'

export async function appRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post(
    '/wallets/recharge',
    {
      onRequest: async () =>
        verifyRole(['ADMIN', 'USER', 'STUDENT', 'UNIVERSITY_SERVER']),
    },
    recharge,
  )
  app.get(
    '/wallets/balance',
    {
      onRequest: async () =>
        verifyRole(['ADMIN', 'USER', 'STUDENT', 'UNIVERSITY_SERVER']),
    },
    balance,
  )

  app.post(
    '/tickets/purchase',
    {
      onRequest: async () =>
        verifyRole(['ADMIN', 'USER', 'STUDENT', 'UNIVERSITY_SERVER']),
    },
    purchase,
  )
  app.post(
    '/tickets/:ticketId/validate',
    {
      onRequest: async () => verifyRole(['ADMIN']),
    },
    validate,
  )
}
