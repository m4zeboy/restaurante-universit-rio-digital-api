import { UsersRepository } from '@/repositories/users-repository'
import { Role, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { StudentsRepository } from '@/repositories/students-repository'
import { UniversityServersRepository } from '@/repositories/university-servers-repository'
import { YouAreNotAStudentError } from './errors/you-are-not-a-student'
import { YouAreNotAUniversityServerError } from './errors/you-are-not-a-university-server'

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

    const doesExistAUserWithSamePassport =
      await this.studentsRepository.findByPassport(data.passport)

    if (data.role === 'STUDENT' && !doesExistAUserWithSamePassport) {
      throw new YouAreNotAStudentError()
    }

    const doesExistAUniversityServerWithSamePassport =
      await this.universityServersRepository.findByPassport(data.passport)

    if (
      data.role === 'UNIVERSITY_SERVER' &&
      !doesExistAUniversityServerWithSamePassport
    ) {
      throw new YouAreNotAUniversityServerError()
    }

    const user = await this.usersRepository.create({
      id: data.id,
      name: data.name,
      passport: data.passport,
      password_hash: passwordHash,
      role: data.role ?? 'USER',
    })

    return { user }
  }
}
