import { expect, describe, it, beforeEach, vi } from 'vitest'
import { InMemoryDishesRepository } from '@/repositories/in-memory/in-memory-dishes-repository'
import { afterEach } from 'node:test'
import { GetDishOfTheDayUseCase } from './get-dish-of-the-day'

let dishesRepository: InMemoryDishesRepository
let sut: GetDishOfTheDayUseCase

describe('Get Dish Of The Day Use Case', () => {
  beforeEach(() => {
    dishesRepository = new InMemoryDishesRepository()
    sut = new GetDishOfTheDayUseCase(dishesRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to get the dish of the day', async () => {
    vi.setSystemTime(new Date('2023-09-20'))
    await dishesRepository.create({
      baseDish: 'White rice, Integral rice and Beans',
      salad: 'Tabule',
      mainDish: 'Pot meat',
      followUp: 'Cassava',
      veganMainDish: 'Yakisoba',
      dessert: 'Orange',
      date: new Date(),
    })

    const { dish } = await sut.execute({ date: '2023-09-20' })

    expect(dish).toEqual(expect.objectContaining({ id: expect.any(String) }))
  })
})
