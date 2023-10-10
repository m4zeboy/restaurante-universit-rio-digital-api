import { makeGetDishOfTheDay } from '@/use-cases/factories/make-get-dish-of-the-day'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getDishOfTheDay(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const useCase = makeGetDishOfTheDay()
  const currentDate = new Date()

  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Add 1 to month because months are 0-indexed
  const day = String(currentDate.getDate()).padStart(2, '0')

  const date = `${year}-${month}-${day}`
  const { dish } = await useCase.execute({ date })
  return reply.status(201).send({ dish })
}
