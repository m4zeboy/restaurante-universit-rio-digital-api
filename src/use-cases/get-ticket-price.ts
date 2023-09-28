import { StudentsRepository } from '@/repositories/students-repository'
import { User } from '@prisma/client'
import { CheckDiscountEligibilityUseCase } from './check-discount-eligibility'

interface GetTicketPriceRequest {
  user: User
}

interface GetTicketPriceCaseReply {
  price: number
}

export class GetTicketPriceUseCase {
  constructor(private studentsRepository: StudentsRepository) { }

  async execute(data: GetTicketPriceRequest): Promise<GetTicketPriceCaseReply> {
    let price: number
    if (data.user.role === 'ADMIN') {
      price = 0
    } else {
      const checkDiscountEligibilityUseCase =
        new CheckDiscountEligibilityUseCase(this.studentsRepository)
      const { isEligible } = await checkDiscountEligibilityUseCase.execute({
        user: data.user,
      })
      isEligible ? (price = 3) : (price = 15)
    }

    return { price }
  }
}
