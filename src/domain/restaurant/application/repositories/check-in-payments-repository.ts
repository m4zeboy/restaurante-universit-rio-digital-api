import { CheckInPayment } from "../../enterprise/entities/check-in-payment";

export interface CheckInPaymentsRepository {
  create(checkInPayment: CheckInPayment): Promise<void>
}
