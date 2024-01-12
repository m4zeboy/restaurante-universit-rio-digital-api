import { TestCheckInsRepository } from "test/repositories/test-check-ins-repository"
import { CheckInUseCase } from "./check-in"

let testCheckInsRepository: TestCheckInsRepository
let checkInUseCase: CheckInUseCase
describe('check in', () => {
  beforeEach(() => {
    testCheckInsRepository = new TestCheckInsRepository()
    checkInUseCase = new CheckInUseCase(testCheckInsRepository)
  })

  it('should be able to check in', async () => {
    const { isSuccess, value } = await checkInUseCase.execute({
      clientId: 'client-1'
    })

    expect(isSuccess()).toBeTruthy()
    expect(testCheckInsRepository.items[0]).toEqual(value?.checkIn)
  })
})
