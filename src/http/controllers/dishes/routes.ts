import { FastifyInstance } from 'fastify'
import { dishes } from './dishes'
import { getDishOfTheDay } from './get-dish-of-the-day'
import { verifyRole } from '@/http/middlewares/verify-role'

export async function dishesRoutes(app: FastifyInstance) {
  app.post(
    '/dishes',
    {
      onRequest: async () => verifyRole(['ADMIN']),
    },
    dishes,
  )
  app.get('/dishes/today', getDishOfTheDay)
}
