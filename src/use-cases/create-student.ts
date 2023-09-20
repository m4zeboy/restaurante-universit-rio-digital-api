import { StudentsRepository } from '@/repositories/students-repository'
import { Student } from '@prisma/client'
import { StudentAlreadyExistsError } from './errors/student-already-exists'

interface CreateStudentUseCaseRequest {
  rga: string
  uniqueRegister?: string
  passport: string
}

interface CreateStudentUseCaseReply {
  student: Student
}

export class CreateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) { }

  async execute(
    data: CreateStudentUseCaseRequest,
  ): Promise<CreateStudentUseCaseReply> {
    const studentAlreadyExists = await this.studentsRepository.findByRga(
      data.rga,
    )

    if (studentAlreadyExists) {
      throw new StudentAlreadyExistsError()
    }

    const student = await this.studentsRepository.create(data)

    return { student }
  }
}
