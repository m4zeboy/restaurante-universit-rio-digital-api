export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Passport already exists.')
  }
}
