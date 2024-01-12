import { CheckIn } from "../../enterprise/entities/check-in";

export interface CheckInsRepository {
  create(checkIn: CheckIn): Promise<void>
}
