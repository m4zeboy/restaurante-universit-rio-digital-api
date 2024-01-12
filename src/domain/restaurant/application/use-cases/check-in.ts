import { Either, success } from "@/core/either";
import { CheckIn } from "../../enterprise/entities/check-in";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { CheckInsRepository } from "../repositories/check-ins-repository";

export interface CheckInUseCaseRequest {
  clientId: string
}

export type CheckInUseCaseReply = Either<null, { checkIn: CheckIn }>

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }
  async execute({ clientId }: CheckInUseCaseRequest): Promise<CheckInUseCaseReply> {

    const checkIn = CheckIn.create({
      clientId: new UniqueEntityID(clientId)
    })

    // const payment = Payment.create({ amount: 15 })

    // const checkInPayment = CheckInPayment.create(
    //   {
    //     checkInId: checkIn.id,
    //     paymentId: payment.id
    //   }
    // )

    await this.checkInsRepository.create(checkIn)

    return success({ checkIn })
  }
}
