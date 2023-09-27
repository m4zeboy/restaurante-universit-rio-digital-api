import { PrismaUniversityServersRepository } from '@/repositories/prisma/prisma-university-servers'
import { CreateStudentUseCase } from '../create-student'
import { PrismaStudentsRepository } from '@/repositories/prisma/prisma-students-repository'

export function makeCreateStudent() {
  const studentsRepository = new PrismaStudentsRepository()
  const universityServersRepository = new PrismaUniversityServersRepository()
  const useCase = new CreateStudentUseCase(
    studentsRepository,
    universityServersRepository,
  )
  return useCase
}
