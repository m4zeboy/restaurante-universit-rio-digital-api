import { TestCheckInsRepository } from "test/repositories/test-check-ins-repository"
import { ValidateCheckInUseCase } from "./validate-check-in"
import { makeCheckIn } from "test/factories/make-check-in"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { CheckInAlreadyValidatedError } from "./errors/check-in-already-validated-error"

let testCheckInsRepository: TestCheckInsRepository
let validateCheckInUseCase: ValidateCheckInUseCase
describe('validate check in', () => {
  beforeEach(() => {
    testCheckInsRepository = new TestCheckInsRepository()
    validateCheckInUseCase = new ValidateCheckInUseCase(testCheckInsRepository)
  })

  it('should be able to validate a check in', async () => {
    const checkIn = makeCheckIn(undefined, new UniqueEntityID('check-in-1'))
    testCheckInsRepository.items.push(checkIn)
    const { isSuccess, value } = await validateCheckInUseCase.execute({
      checkInId: 'check-in-1'
    })

    expect(isSuccess()).toBeTruthy()
    expect(checkIn.validatedAt).toEqual(expect.any(Date))
  })

  it('should not be able to validate a check in twice', async () => {
    const checkIn = makeCheckIn(undefined, new UniqueEntityID('check-in-1'))
    testCheckInsRepository.items.push(checkIn)

    await validateCheckInUseCase.execute({
      checkInId: 'check-in-1'
    })

    const { isFailure, value } = await validateCheckInUseCase.execute({
      checkInId: 'check-in-1'
    })

    expect(isFailure()).toBeTruthy()
    expect(value).toBeInstanceOf(CheckInAlreadyValidatedError)
  })
})
