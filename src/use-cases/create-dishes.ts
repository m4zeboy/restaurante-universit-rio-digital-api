import { Dish } from '@prisma/client'
import { DishesRepository } from '@/repositories/dishes-repository'
import { DishAlreadyExists } from './errors/dish-already-exists'

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
    const dishWithThisDateAlreadyExists =
      await this.dishesRepository.findByDate(data.date)

    if (dishWithThisDateAlreadyExists) {
      throw new DishAlreadyExists()
    }

    const dish = await this.dishesRepository.create(data)

    return { dish }
  }
}
