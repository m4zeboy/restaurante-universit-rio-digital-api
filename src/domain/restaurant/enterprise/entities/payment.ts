import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface PaymentProps {
  amount: number
  createdAt: Date
}

export class Payment extends Entity<PaymentProps> {
  get amount() {
    return this.props.amount
  }
  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<PaymentProps, 'createdAt'>, id?: UniqueEntityID) {
    const payment = new Payment({
      createdAt: new Date(),
      ...props
    }, id)
    return payment
  }
}
