import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeSetCreditCard } from '@/use-cases/factories/make-set-credit-card'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function setCreditCard(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const setCreditCardParamsSchema = z.object({
    paymentId: z.string().uuid(),
  })

  const setCreditCardBodySchema = z.object({
    nameInCard: z.string(),
    cardNumber: z
      .string()
      .refine((string) => /^\d{4} \d{4} \d{4} \d{4}$/.test(string)),
    expirationDate: z.string(),
    cvc: z.coerce.number(),
  })

  const { paymentId } = setCreditCardParamsSchema.parse(request.params)
  const { cardNumber, cvc, expirationDate, nameInCard } =
    setCreditCardBodySchema.parse(request.body)

  const useCase = makeSetCreditCard()
  try {
    const { payment } = await useCase.execute({
      paymentId,
      card_number: cardNumber,
      cvc,
      expiration_date: expirationDate,
      name_in_card: nameInCard,
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
