import { PrismaDishesRepository } from '@/repositories/prisma/prisma-dishes-repository'
import { CreateDishesUseCase } from '../create-dishes'

export function makeCreateDishes() {
  const dishesRepository = new PrismaDishesRepository()
  const useCase = new CreateDishesUseCase(dishesRepository)
  return useCase
}
