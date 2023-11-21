import { Student } from '@prisma/client'

export interface StudentsRepository {
  create(data: {
    rga: string
    unique_register?: string
    passport: string
  }): Promise<Student>

  findByRga(rga: string): Promise<Student | null>
  findByPassport(passport: string): Promise<Student | null>
}
