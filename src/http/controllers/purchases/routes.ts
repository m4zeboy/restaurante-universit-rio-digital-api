import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { purchase } from './purchase'
import { listPurchases } from './list-purchases'

export async function purchasesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/tickets/purchases', purchase)
  app.get('/tickets/purchases', listPurchases)
}
