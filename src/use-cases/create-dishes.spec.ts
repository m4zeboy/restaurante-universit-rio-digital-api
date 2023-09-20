import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryDishesRepository } from '@/repositories/in-memory/in-memory-dishes-repository'
import { CreateDishesUseCase } from './create-dishes'

let dishesRepository: InMemoryDishesRepository
let sut: CreateDishesUseCase

describe('Create Dish Use Case', () => {
  beforeEach(() => {
    dishesRepository = new InMemoryDishesRepository()
    sut = new CreateDishesUseCase(dishesRepository)
  })

  it('should be able to create a dish', async () => {
    const { dish } = await sut.execute({
      baseDish: 'White rice, Integral rice and Beans',
      salad: 'Tabule',
      mainDish: 'Pot meat',
      followUp: 'Cassava',
      veganMainDish: 'Yakisoba',
      dessert: 'Orange',
      date: new Date('2023-09-20'),
    })

    expect(dish.id).toEqual(expect.any(String))
  })
})
