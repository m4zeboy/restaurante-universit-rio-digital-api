import { UsersRepository } from '@/repositories/users-repository'
import { Role, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { StudentsRepository } from '@/repositories/students-repository'
import { UniversityServersRepository } from '@/repositories/university-servers-repository'

interface RegisterUseCaseRequest {
  id?: string
  name: string
  passport: string
  password: string
  role?: Role
}

interface RegisterUseCaseReply {
  user: User
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private studentsRepository: StudentsRepository,
    private universityServersRepository: UniversityServersRepository,
  ) { }

  async execute(data: RegisterUseCaseRequest): Promise<RegisterUseCaseReply> {
    const userAlreadyExists = await this.usersRepository.findByPassport(
      data.passport,
    )

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(data.password, 6)

    let role: Role = 'USER'
    const isUserAStudent = await this.studentsRepository.findByPassport(
      data.passport,
    )

    if (isUserAStudent) {
      role = 'STUDENT'
    }

    const isUserAUniversityServer =
      await this.universityServersRepository.findByPassport(data.passport)

    if (isUserAUniversityServer) {
      role = 'UNIVERSITY_SERVER'
    }

    const user = await this.usersRepository.create({
      id: data.id,
      name: data.name,
      passport: data.passport,
      password_hash: passwordHash,
      role,
    })

    return { user }
  }
}
