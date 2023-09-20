import { StudentsRepository } from '@/repositories/students-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Student } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { StudentAlreadyExistsError } from './errors/student-already-exists'

interface CreateStudentUseCaseRequest {
  userId: string
  rga: string
  uniqueRegister?: string
}

interface CreateStudentUseCaseReply {
  student: Student
}

export class CreateStudentUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private studentsRepository: StudentsRepository,
  ) { }

  async execute(
    data: CreateStudentUseCaseRequest,
  ): Promise<CreateStudentUseCaseReply> {
    const doesUserExists = await this.usersRepository.findById(data.userId)

    if (!doesUserExists) {
      throw new ResourceNotFoundError()
    }

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
