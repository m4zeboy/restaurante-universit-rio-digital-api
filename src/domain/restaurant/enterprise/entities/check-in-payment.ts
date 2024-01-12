import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface CheckInPaymentProps {
  checkInId: UniqueEntityID
  paymentId: UniqueEntityID
}

export class CheckInPayment extends Entity<CheckInPaymentProps> {
  get checkInId() {
    return this.props.checkInId
  }
  get paymentId() {
    return this.props.paymentId
  }

  static create(props: CheckInPaymentProps, id?: UniqueEntityID) {
    const checkInPayment = new CheckInPayment(props, id)
    return checkInPayment
  }
}
