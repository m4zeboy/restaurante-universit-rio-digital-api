import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'

interface ProfileUseCaseRequest {
  userId: string
}

interface ProfileUseCaseReply {
  user: User | null
}

export class ProfileUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    userId,
  }: ProfileUseCaseRequest): Promise<ProfileUseCaseReply> {
    const user = await this.usersRepository.findById(userId)
    return { user }
  }
}
