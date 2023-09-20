import { Dish } from '@prisma/client'

export interface DishesRepository {
  create(data: {
    id?: string
    mainDish: string
    veganMainDish: string
    followUp: string
    baseDish: string
    salad: string
    dessert: string
    date: Date
  }): Promise<Dish>

  findByDate(date: Date): Promise<Dish | null>
}
