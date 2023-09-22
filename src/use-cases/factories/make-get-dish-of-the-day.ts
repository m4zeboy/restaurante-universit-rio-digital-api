import { PrismaDishesRepository } from '@/repositories/prisma/prisma-dishes-repository'
import { GetDishOfTheDayUseCase } from '../get-dish-of-the-day'

export function makeGetDishOfTheDay() {
  const dishesRepository = new PrismaDishesRepository()
  const useCase = new GetDishOfTheDayUseCase(dishesRepository)
  return useCase
}
