import { UsersRepository } from '@/repositories/users-repository'
import { UniversityServer } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { UniversityServersRepository } from '@/repositories/university-servers-repository'
import { UniversityServerAlreadyExistsError } from './errors/university-server-already-exists'

interface CreateUniversityServerUseCaseRequest {
  userId: string
  siape: string
}

interface CreateUniversityServerUseCaseReply {
  universityServer: UniversityServer
}

export class CreateUniversityServerUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private universityServersRepository: UniversityServersRepository,
  ) { }

  async execute(
    data: CreateUniversityServerUseCaseRequest,
  ): Promise<CreateUniversityServerUseCaseReply> {
    const doesUserExists = await this.usersRepository.findById(data.userId)

    if (!doesUserExists) {
      throw new ResourceNotFoundError()
    }

    const universityServerAlreadyExists =
      await this.universityServersRepository.findBySiape(data.siape)

    if (universityServerAlreadyExists) {
      throw new UniversityServerAlreadyExistsError()
    }

    const universityServer = await this.universityServersRepository.create(data)

    return { universityServer }
  }
}
