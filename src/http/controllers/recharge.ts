import { InvalidRechargeAmountError } from '@/use-cases/errors/invalid-recharge-amount'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeRechargeWallet } from '@/use-cases/factories/make-recharge-wallet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function recharge(request: FastifyRequest, reply: FastifyReply) {
  const rechargeBodySchema = z.object({
    amount: z.coerce.number().gt(0),
  })

  const data = rechargeBodySchema.parse(request.body)

  const useCase = makeRechargeWallet()
  try {
    const { walletRecharge } = await useCase.execute({
      amount: data.amount,
      userId: request.user.sub,
    })

    return reply.status(201).send({ walletRecharge })
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
