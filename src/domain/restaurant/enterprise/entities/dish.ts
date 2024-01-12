import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface DishProps {
    base: string
    principal: string
    principalVegan: string
    followUp: string
    dessert: string
}

export class Dish extends Entity<DishProps> {
    get base() {
        return this.props.base
    }
    set base(base: string) {
        this.props.base = base
    }
    get principal() {
        return this.props.principal
    }
    set principal(principal: string) {
        this.props.principal = principal
    }
    get principalVegan() {
        return this.props.principalVegan
    }
    set principalVegan(principalVegan: string) {
        this.props.principalVegan = principalVegan
    }
    get followUp() {
        return this.props.followUp
    }
    set followUp(followUp: string) {
        this.props.followUp = followUp
    }
    get dessert() {
        return this.props.dessert
    }
    set dessert(dessert: string) {
        this.props.dessert = dessert
    }



    static create(props: DishProps, id?: UniqueEntityID) {
        const dish = new Dish(props, id)
        return dish
    }
}
