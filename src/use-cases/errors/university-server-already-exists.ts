export class UniversityServerAlreadyExistsError extends Error {
  constructor() {
    super('SIAPE already exists.')
  }
}
