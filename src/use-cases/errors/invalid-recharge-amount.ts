export class InvalidRechargeAmountError extends Error {
  constructor() {
    super('The recharge value cannot be less than or equal to zero.')
  }
}
