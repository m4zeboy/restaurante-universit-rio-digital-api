import { StudentsRepository } from '@/repositories/students-repository'
import { User } from '@prisma/client'

interface CheckDiscountEligibilityUseCaseRequest {
  user: User
}

interface CheckDiscountEligibilityUseCaseReply {
  isEligible: boolean
}

export class CheckDiscountEligibilityUseCase {
  constructor(private studentsRepository: StudentsRepository) { }

  async execute(
    data: CheckDiscountEligibilityUseCaseRequest,
  ): Promise<CheckDiscountEligibilityUseCaseReply> {
    const student = await this.studentsRepository.findByPassport(
      data.user.passport,
    )
    const isEligible = !!(
      data.user.role === 'STUDENT' &&
      student &&
      student.unique_register !== null
    )

    return { isEligible }
  }
}
