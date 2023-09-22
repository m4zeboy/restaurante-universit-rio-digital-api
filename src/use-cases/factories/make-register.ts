import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'
import { PrismaStudentsRepository } from '@/repositories/prisma/prisma-students-repository'
import { PrismaUniversityServersRepository } from '@/repositories/prisma/prisma-university-servers'

export function makeRegister() {
  const usersRepository = new PrismaUsersRepository()
  const studentsRepository = new PrismaStudentsRepository()
  const universityServersRepository = new PrismaUniversityServersRepository()
  const useCase = new RegisterUseCase(
    usersRepository,
    studentsRepository,
    universityServersRepository,
  )
  return useCase
}
