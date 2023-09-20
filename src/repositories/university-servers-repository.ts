import { UniversityServer } from '@prisma/client'

export interface UniversityServersRepository {
  create(data: { userId: string; siape: string }): Promise<UniversityServer>

  findBySiape(siape: string): Promise<UniversityServer | null>
}
