export class WalletAlreadyExistsError extends Error {
  constructor() {
    super('The user already has a wallet.')
  }
}
