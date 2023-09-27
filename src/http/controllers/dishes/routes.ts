import { FastifyInstance } from 'fastify'
import { dishes } from './dishes'
import { getDishOfTheDay } from './get-dish-of-the-day'

export async function dishesRoutes(app: FastifyInstance) {
  app.post('/dishes', dishes)
  app.get('/dishes/today', getDishOfTheDay)
}
