import { UsersRepository } from '@/repositories/users-repository'
import { Role, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { StudentsRepository } from '@/repositories/students-repository'
import { UniversityServersRepository } from '@/repositories/university-servers-repository'

type RegisterUseCaseRequest = {
  id?: string
  name: string
  passport: string
  password: string
  role?: Role
  rga?: string
  uniqueRegister?: string
  siape?: string
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

    if (data.role === 'STUDENT') {
      await this.studentsRepository.create({
        passport: data.passport,
        rga: data.rga!,
        unique_register: data.uniqueRegister,
      })
    } else if (data.role === 'UNIVERSITY_SERVER') {
      await this.universityServersRepository.create({
        passport: data.passport,
        siape: data.siape!,
      })
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
