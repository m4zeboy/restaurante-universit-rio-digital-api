import { InvalidRechargeAmountError } from '@/use-cases/errors/invalid-recharge-amount'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeGetWalletBalance } from '@/use-cases/factories/make-get-wallet-balance'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function balance(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetWalletBalance()
  try {
    const { balance } = await useCase.execute({ userId: request.user.sub })

    return reply.status(201).send({ balance })
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
