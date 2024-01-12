import { TestDishesRepository } from "test/repositories/dishes-repository"
import { CreateDishUseCase } from "./create-dish"

let testDishesRepository: TestDishesRepository
let createDishUseCase: CreateDishUseCase
describe('create dish', () => {
  beforeEach(() => {
    testDishesRepository = new TestDishesRepository()
    createDishUseCase = new CreateDishUseCase(testDishesRepository)
  })

  it('should be able to create a dish', async () => {
    const { isSuccess, value } = await createDishUseCase.execute({
      base: 'Arroz branco, Arroz integral e Feijão carioca',
      principal: 'Carne de panela',
      principalVegan: 'Lasanha de grão de bico',
      followUp: 'Mandioca',
      dessert: 'Laranja'
    })

    expect(isSuccess()).toBeTruthy()
    expect(testDishesRepository.items[0]).toEqual(value?.dish)
  })
})
