import { Student } from '@prisma/client'

export interface StudentsRepository {
  create(data: {
    rga: string
    uniqueRegister?: string
    passport: string
  }): Promise<Student>

  findByRga(rga: string): Promise<Student | null>
  findByPassport(passport: string): Promise<Student | null>
}
