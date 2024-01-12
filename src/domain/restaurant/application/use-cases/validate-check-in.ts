import { Either, failure, success } from "@/core/either";
import { CheckInsRepository } from "../repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CheckInAlreadyValidatedError } from "./errors/check-in-already-validated-error";
import { CheckIn } from "../../enterprise/entities/check-in";

export interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

export type ValidateCheckInUseCaseReply = Either<ResourceNotFoundError, {
  checkIn: CheckIn
}>

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) { }
  async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseReply> {
    const checkIn = await this.checkInsRepository.findById(checkInId)
    if (!checkIn) {
      return failure(new ResourceNotFoundError())
    }

    if (checkIn.validatedAt) {
      return failure(new CheckInAlreadyValidatedError())
    }

    checkIn.validate()

    await this.checkInsRepository.save(checkIn)

    return success({ checkIn })
  }
}
