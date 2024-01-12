import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { CheckIn, CheckInProps } from "@/domain/restaurant/enterprise/entities/check-in";
import { faker } from '@faker-js/faker'
export function makeCheckIn(override?: CheckInProps, id?: UniqueEntityID) {
  const checkIn = CheckIn.create({
    clientId: new UniqueEntityID(),
    ...override
  }, id)

  return checkIn

}
