import { Either, success } from "@/core/either";
import { CheckIn } from "../../enterprise/entities/check-in";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Payment } from "../../enterprise/entities/payment";
import { CheckInPayment } from "../../enterprise/entities/check-in-payment";
import { CheckInsRepository } from "../repositories/check-ins-repository";
import { CheckInPaymentsRepository } from "../repositories/check-in-payments-repository";

export interface CheckInUseCaseRequest {
  clientId: string
}

export type CheckInUseCaseReply = Either<null, { checkIn: CheckIn }>

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private checkInPaymentRepository: CheckInPaymentsRepository,
  ) { }
  async execute({ clientId }: CheckInUseCaseRequest): Promise<CheckInUseCaseReply> {

    const checkIn = CheckIn.create({
      clientId: new UniqueEntityID(clientId)
    })

    const payment = Payment.create({ amount: 15 })

    const checkInPayment = CheckInPayment.create(
      {
        checkInId: checkIn.id,
        paymentId: payment.id
      }
    )

    await this.checkInsRepository.create(checkIn)
    await this.checkInPaymentRepository.create(checkInPayment)

    return success({ checkIn })
  }
}
