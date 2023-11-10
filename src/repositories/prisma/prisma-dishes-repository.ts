import { prisma } from '@/lib/prisma'
import { DishesRepository } from '../dishes-repository'

export class PrismaDishesRepository implements DishesRepository {
  async create(data: {
    id?: string | undefined
    mainDish: string
    veganMainDish: string
    followUp: string
    baseDish: string
    salad: string
    dessert: string
    date: Date
  }) {
    const item = await prisma.dish.create({
      data: {
        base_dish: data.baseDish,
        date: data.date,
        dessert: data.dessert,
        follow_up: data.followUp,
        main_dish: data.mainDish,
        salad: data.salad,
        vegan_main_dish: data.veganMainDish,
      },
    })
    return item
  }

  async findByDate(date: Date) {
    const item = await prisma.dish.findFirst({
      where: {
        date: { equals: date },
      },
    })
    return item
  }
}
