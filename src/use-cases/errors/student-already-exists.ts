export class StudentAlreadyExistsError extends Error {
  constructor() {
    super('RGA already exists.')
  }
}
