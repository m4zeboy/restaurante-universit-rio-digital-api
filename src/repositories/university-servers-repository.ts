import { UniversityServer } from '@prisma/client'

export interface UniversityServersRepository {
  create(data: { siape: string; passport: string }): Promise<UniversityServer>

  findBySiape(siape: string): Promise<UniversityServer | null>
  findByPassport(passport: string): Promise<UniversityServer | null>
}
