import { Student } from '@prisma/client'

export interface StudentsRepository {
  create(data: {
    userId: string
    rga: string
    uniqueRegister?: string
  }): Promise<Student>

  findByRga(rga: string): Promise<Student | null>
}
