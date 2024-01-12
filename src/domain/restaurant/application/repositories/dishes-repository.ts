import { Dish } from "../../enterprise/entities/dish";

export interface DishesRepository {
  create(dish: Dish): Promise<void>
}
