import { PrismaUniversityServersRepository } from '@/repositories/prisma/prisma-university-servers'
import { CreateUniversityServerUseCase } from '../create-university-server'

export function makeCreateUniversityServer() {
  const universityServersRepository = new PrismaUniversityServersRepository()
  const useCase = new CreateUniversityServerUseCase(universityServersRepository)
  return useCase
}
