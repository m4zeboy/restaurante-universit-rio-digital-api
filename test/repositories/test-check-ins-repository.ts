import { CheckInsRepository } from "@/domain/restaurant/application/repositories/check-ins-repository";
import { CheckIn } from "@/domain/restaurant/enterprise/entities/check-in";

export class TestCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []
  async create(checkIn: CheckIn): Promise<void> {
    this.items.push(checkIn)
  }
  async save(checkIn: CheckIn): Promise<void> {
    const index = this.items.findIndex((item) => item.id === checkIn.id)
    if (index === -1) return
    this.items[index] = checkIn
  }
  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find(checkIn => checkIn.id.toString() === id)
    if (!checkIn) {
      return null
    }
    return checkIn
  }


}
