import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { requestRecharge } from './requst-recharge'
import { setPaymentMethod } from './set-payment-method'
import { setCreditCard } from './set-credit-card'

export async function rechargeRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/wallets/recharge/request', requestRecharge)
  app.patch('/wallets/recharge/payment/:paymentId/method', setPaymentMethod)
  app.patch('/wallets/recharge/payment/:paymentId/credit_card', setCreditCard)
}
