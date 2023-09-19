import { UsersRepository } from '@/repositories/users-repository'
import { Role, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface RegisterUseCaseRequest {
  id?: string
  name: string
  passport: string
  password: string
  role: Role
}

interface RegisterUseCaseReply {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }
  async execute(data: RegisterUseCaseRequest): Promise<RegisterUseCaseReply> {
    const userAlreadyExists = await this.usersRepository.findByPassport(
      data.passport,
    )

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(data.password, 6)

    const user = await this.usersRepository.create({
      id: data.id,
      name: data.name,
      passport: data.passport,
      password_hash: passwordHash,
      role: data.role,
    })

    return { user }
  }
}
