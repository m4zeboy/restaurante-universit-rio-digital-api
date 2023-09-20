import { Dish } from '@prisma/client'
import { DishesRepository } from '@/repositories/dishes-repository'

interface GetDishOfTheDayUseCaseRequest {
  date: string
}

interface GetDishOfTheDayUseCaseReply {
  dish: Dish | null
}

export class GetDishOfTheDayUseCase {
  constructor(private dishesRepository: DishesRepository) { }

  async execute(
    data: GetDishOfTheDayUseCaseRequest,
  ): Promise<GetDishOfTheDayUseCaseReply> {
    const dish = await this.dishesRepository.findByDate(new Date(data.date))
    return { dish }
  }
}
