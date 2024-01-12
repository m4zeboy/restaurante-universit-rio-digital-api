import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Dish, DishProps } from "@/domain/restaurant/enterprise/entities/dish";
import { faker } from '@faker-js/faker'
export function makeDish(override?: DishProps, id?: UniqueEntityID) {
  const dish = Dish.create({
    base: faker.lorem.words(),
    principal: faker.lorem.words(),
    principalVegan: faker.lorem.words(),
    followUp: faker.lorem.words(),
    dessert: faker.lorem.words(),
    ...override
  }, id)

  return dish

}
