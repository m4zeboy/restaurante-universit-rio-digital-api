import { CreateStudentUseCase } from '../create-student'
import { PrismaStudentsRepository } from '@/repositories/prisma/prisma-students-repository'

export function makeCreateStudent() {
  const studentsRepository = new PrismaStudentsRepository()
  const useCase = new CreateStudentUseCase(studentsRepository)
  return useCase
}
