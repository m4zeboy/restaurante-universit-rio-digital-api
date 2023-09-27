import { PrismaUniversityServersRepository } from '@/repositories/prisma/prisma-university-servers'
import { CreateUniversityServerUseCase } from '../create-university-server'
import { PrismaStudentsRepository } from '@/repositories/prisma/prisma-students-repository'

export function makeCreateUniversityServer() {
  const universityServersRepository = new PrismaUniversityServersRepository()
  const studentsRepository = new PrismaStudentsRepository()
  const useCase = new CreateUniversityServerUseCase(
    universityServersRepository,
    studentsRepository,
  )
  return useCase
}
