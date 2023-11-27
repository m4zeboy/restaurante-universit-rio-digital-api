import { PaymentStrategy } from './payment-strategy'

export class PaymentContext {
  private paymentStrategy!: PaymentStrategy
  setStrategy(strategy: PaymentStrategy) {
    this.paymentStrategy = strategy
  }

  async execute(amount: number) {
    return this.paymentStrategy.pay(amount)
  }
}
