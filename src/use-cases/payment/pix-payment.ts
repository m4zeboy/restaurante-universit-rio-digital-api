import { PaymentStrategy } from './payment-strategy'

export class PixPayment implements PaymentStrategy {
  async pay(amount: number) { }
}
