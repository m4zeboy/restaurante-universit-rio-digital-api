import { UniversityServer } from '@prisma/client'
import { UniversityServersRepository } from '@/repositories/university-servers-repository'
import { UniversityServerAlreadyExistsError } from './errors/university-server-already-exists'

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
  ) { }

  async execute(
    data: CreateUniversityServerUseCaseRequest,
  ): Promise<CreateUniversityServerUseCaseReply> {
    const universityServerAlreadyExists =
      await this.universityServersRepository.findBySiape(data.siape)

    if (universityServerAlreadyExists) {
      throw new UniversityServerAlreadyExistsError()
    }

    const universityServer = await this.universityServersRepository.create(data)

    return { universityServer }
  }
}
