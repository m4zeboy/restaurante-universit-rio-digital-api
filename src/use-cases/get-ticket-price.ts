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
    if (data.user.role === 'ADMIN') {
      return { price: 0 }
    }

    const checkDiscountEligibility = new CheckDiscountEligibilityUseCase(
      this.studentsRepository,
    )
    const { isEligible } = await checkDiscountEligibility.execute({
      user: data.user,
    })
    if (isEligible) {
      return { price: 3 }
    }
    return { price: 15 }
  }
}
