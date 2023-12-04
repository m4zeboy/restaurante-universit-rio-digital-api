import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeSetPaymentMethod } from '@/use-cases/factories/make-set-payment-method'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function setPaymentMethod(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const setPaymentMethodParamsSchema = z.object({
    paymentId: z.string().uuid(),
  })

  const setPaymentMethodBodySchema = z.object({
    paymentMethod: z.enum(['CREDIT_CARD', 'PIX']),
  })

  const { paymentId } = setPaymentMethodParamsSchema.parse(request.params)
  const { paymentMethod } = setPaymentMethodBodySchema.parse(request.body)

  const useCase = makeSetPaymentMethod()
  try {
    const { payment } = await useCase.execute({
      paymentId,
      paymentMethod,
    })
    return reply.status(200).send({ payment })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
    throw error
  }
}
