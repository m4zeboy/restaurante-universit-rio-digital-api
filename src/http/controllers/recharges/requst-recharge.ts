import { InvalidRechargeAmountError } from '@/use-cases/errors/invalid-recharge-amount'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeCreatePayment } from '@/use-cases/factories/make-create-payment'
import { makeRechargeWallet } from '@/use-cases/factories/make-recharge-wallet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function requestRecharge(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const rechargeBodySchema = z.object({
    requestedAmount: z.coerce.number().gt(0),
  })

  const data = rechargeBodySchema.parse(request.body)

  const useCase = makeRechargeWallet()
  try {
    const { walletRecharge } = await useCase.execute({
      requestedAmount: data.requestedAmount,
      userId: request.user.sub,
    })

    const createPaymentUseCase = makeCreatePayment()

    const { payment } = await createPaymentUseCase.execute({
      amount: data.requestedAmount,
      walletRechargeId: walletRecharge.id,
    })

    return reply.status(201).send({ walletRecharge, payment })
  } catch (error) {
    if (error instanceof InvalidRechargeAmountError) {
      return reply.status(400).send({
        message: error.message,
      })
    }
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
    throw error
  }
}
