import { UniversityServer } from '@prisma/client'
import { UniversityServersRepository } from '@/repositories/university-servers-repository'
import { UniversityServerAlreadyExistsError } from './errors/university-server-already-exists'
import { StudentsRepository } from '@/repositories/students-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface CreateUniversityServerUseCaseRequest {
  passport: string
  siape: string
}

interface CreateUniversityServerUseCaseReply {
  universityServer: UniversityServer
}

export class CreateUniversityServerUseCase {
  constructor(
    private universityServersRepository: UniversityServersRepository,
    private studentsRepository: StudentsRepository,
  ) { }

  async execute(
    data: CreateUniversityServerUseCaseRequest,
  ): Promise<CreateUniversityServerUseCaseReply> {
    const universityServerAlreadyExists =
      await this.universityServersRepository.findBySiape(data.siape)

    if (universityServerAlreadyExists) {
      throw new UniversityServerAlreadyExistsError()
    }

    const studentAlreadyExists = await this.studentsRepository.findByPassport(
      data.passport,
    )
    if (studentAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const universityServer = await this.universityServersRepository.create(data)

    return { universityServer }
  }
}
