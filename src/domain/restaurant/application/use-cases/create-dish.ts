import { Either, success } from "@/core/either";
import { Dish } from "../../enterprise/entities/dish";
import { DishesRepository } from "../repositories/dishes-repository";

export interface CreateDishUseCaseRequest {
    base: string
    principal: string
    principalVegan: string
    followUp: string
    dessert: string
}

export type CreateDishUseCaseReply = Either<null, { dish: Dish }>

export class CreateDishUseCase {
    constructor(private dishesRepository: DishesRepository) { }
    async execute({
        base,
        principal,
        principalVegan,
        followUp,
        dessert,
    }: CreateDishUseCaseRequest): Promise<CreateDishUseCaseReply> {
        const dish = Dish.create({
            base,
            principal,
            principalVegan,
            followUp,
            dessert
        })

        await this.dishesRepository.create(dish)

        return success({ dish })
    }
}
