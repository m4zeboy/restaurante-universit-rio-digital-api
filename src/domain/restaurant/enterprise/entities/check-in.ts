import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface CheckInProps {
  clientId: UniqueEntityID
  createdAt: Date
  validatedAt: null | Date
}

export class CheckIn extends Entity<CheckInProps> {
  get clientId() {
    return this.props.clientId
  }
  get createdAt() {
    return this.props.createdAt
  }
  get validatedAt() {
    return this.props.validatedAt
  }
  validate(date?: Date) {
    this.props.validatedAt = date ?? new Date()
  }

  static create(props: Optional<CheckInProps, 'createdAt' | 'validatedAt'>, id?: UniqueEntityID) {
    const checkIn = new CheckIn({
      ...props,
      createdAt: new Date(),
      validatedAt: null,
    }, id)
    return checkIn
  }
}
