import { CheckIn } from "../../enterprise/entities/check-in";

export interface CheckInsRepository {
  create(checkIn: CheckIn): Promise<void>
  save(checkIn: CheckIn): Promise<void>
  findById(id: string): Promise<CheckIn | null>
}
