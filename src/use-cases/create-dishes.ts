import { Dish } from '@prisma/client'
import { DishesRepository } from '@/repositories/dishes-repository'

interface CreateDishesUseCaseRequest {
  mainDish: string
  veganMainDish: string
  followUp: string
  baseDish: string
  salad: string
  dessert: string
  date: Date
}

interface CreateDishesUseCaseReply {
  dish: Dish
}

export class CreateDishesUseCase {
  constructor(private dishesRepository: DishesRepository) { }

  async execute(
    data: CreateDishesUseCaseRequest,
  ): Promise<CreateDishesUseCaseReply> {
    const dish = await this.dishesRepository.create(data)
    return { dish }
  }
}
