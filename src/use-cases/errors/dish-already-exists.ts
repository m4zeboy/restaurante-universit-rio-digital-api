export class DishAlreadyExists extends Error {
  constructor() {
    super('There is already a dish with the same date.')
  }
}
