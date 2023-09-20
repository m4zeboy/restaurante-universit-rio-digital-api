import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials'

interface AuthenticateUseCaseRequest {
  passport: string
  password: string
}

interface AuthenticateUseCaseReply {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) { }
  async execute(
    data: AuthenticateUseCaseRequest,
  ): Promise<AuthenticateUseCaseReply> {
    const user = await this.usersRepository.findByPassport(data.passport)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const { password_hash } = user

    const doesPasswordMatches = await compare(data.password, password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
