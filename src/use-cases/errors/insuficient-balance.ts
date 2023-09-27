export class InsuficientBalanceError extends Error {
  constructor() {
    super('Insuficient balance.')
  }
}
