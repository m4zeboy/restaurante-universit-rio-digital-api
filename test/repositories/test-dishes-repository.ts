import { DishesRepository } from "@/domain/restaurant/application/repositories/dishes-repository";
import { Dish } from "@/domain/restaurant/enterprise/entities/dish";

export class TestDishesRepository implements DishesRepository {
  public items: Dish[] = []
  async create(dish: Dish): Promise<void> {
    this.items.push(dish)
  }

}
