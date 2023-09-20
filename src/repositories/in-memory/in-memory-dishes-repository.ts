import { Dish } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { DishesRepository } from '../dishes-repository'
import dayjs from 'dayjs'

export class InMemoryDishesRepository implements DishesRepository {
  public items: Dish[] = []
  async findByDate(date: Date) {
    const dish = this.items.find((item) => dayjs(date).isSame(item.date))
    if (!dish) return null
    return dish
  }

  async create(data: {
    id?: string
    mainDish: string
    veganMainDish: string
    followUp: string
    baseDish: string
    salad: string
    dessert: string
    date: Date
  }) {
    const item: Dish = {
      id: data.id ? data.id : randomUUID(),
      base_dish: data.baseDish,
      vegan_main_dish: data.veganMainDish,
      main_dish: data.mainDish,
      follow_up: data.followUp,
      salad: data.salad,
      dessert: data.dessert,
      date: data.date,
    }

    this.items.push(item)
    return item
  }
}
