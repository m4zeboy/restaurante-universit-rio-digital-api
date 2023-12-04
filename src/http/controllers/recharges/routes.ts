import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { requestRecharge } from './requst-recharge'
import { setPaymentMethod } from './set-payment-method'

export async function rechargeRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/wallets/recharge/request', requestRecharge)
  app.patch('/wallets/recharge/payment/:paymentId/method', setPaymentMethod)
}
