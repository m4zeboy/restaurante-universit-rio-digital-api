import { DishAlreadyExists } from '@/use-cases/errors/dish-already-exists'
import { makeCreateDishes } from '@/use-cases/factories/make-create-dishes'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function dishes(request: FastifyRequest, reply: FastifyReply) {
  const dishesBodySchema = z.object({
    mainDish: z.string(),
    veganMainDish: z.string(),
    followUp: z.string(),
    baseDish: z.string(),
    salad: z.string(),
    dessert: z.string(),
    date: z.string(),
  })

  const data = dishesBodySchema.parse(request.body)

  const useCase = makeCreateDishes()
  try {
    const { dish } = await useCase.execute({
      ...data,
      date: new Date(data.date),
    })
    return reply.status(201).send({ dish })
  } catch (error) {
    console.log(error)
    if (error instanceof DishAlreadyExists) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
