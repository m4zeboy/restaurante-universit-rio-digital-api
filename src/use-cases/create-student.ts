import { StudentsRepository } from '@/repositories/students-repository'
import { Student } from '@prisma/client'
import { StudentAlreadyExistsError } from './errors/student-already-exists'
import { UniversityServersRepository } from '@/repositories/university-servers-repository'
import { UniversityServerAlreadyExistsError } from './errors/university-server-already-exists'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface CreateStudentUseCaseRequest {
  rga: string
  uniqueRegister?: string
  passport: string
}

interface CreateStudentUseCaseReply {
  student: Student
}

export class CreateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private universityServersRepository: UniversityServersRepository,
  ) { }

  async execute(
    data: CreateStudentUseCaseRequest,
  ): Promise<CreateStudentUseCaseReply> {
    const studentAlreadyExists = await this.studentsRepository.findByRga(
      data.rga,
    )

    if (studentAlreadyExists) {
      throw new StudentAlreadyExistsError()
    }

    const universityServerAlreadyExists =
      await this.universityServersRepository.findByPassport(data.passport)

    if (universityServerAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const student = await this.studentsRepository.create(data)

    return { student }
  }
}
