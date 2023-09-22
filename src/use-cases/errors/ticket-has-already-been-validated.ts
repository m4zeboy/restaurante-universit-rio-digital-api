export class TicketHasAlreadyBeenValidatedError extends Error {
  constructor() {
    super('The ticket has already been validated.')
  }
}
