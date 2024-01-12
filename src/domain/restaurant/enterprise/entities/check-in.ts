import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface CheckInProps {
  clientId: UniqueEntityID
  createdAt: Date
}

export class CheckIn extends Entity<CheckInProps> {
  get clientId() {
    return this.props.clientId
  }
  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<CheckInProps, 'createdAt'>, id?: UniqueEntityID) {
    const checkIn = new CheckIn({
      ...props,
      createdAt: new Date(),
    }, id)
    return checkIn
  }
}
