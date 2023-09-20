import { Student } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { StudentsRepository } from '../students-repository'

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = []
  async findByPassport(passport: string) {
    const student = this.items.find((student) => student.passport === passport)
    if (!student) return null
    return student
  }

  async create(data: {
    rga: string
    uniqueRegister?: string | undefined
    passport: string
  }) {
    const student: Student = {
      id: randomUUID(),
      rga: data.rga,
      unique_register: data.uniqueRegister ? data.uniqueRegister : null,
      passport: data.passport,
    }

    this.items.push(student)
    return student
  }

  async findByRga(rga: string) {
    const student = this.items.find((student) => student.rga === rga)
    if (!student) return null
    return student
  }
}
