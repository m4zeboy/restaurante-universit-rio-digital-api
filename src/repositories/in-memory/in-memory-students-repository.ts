import { Student } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { StudentsRepository } from '../students-repository'

export class InMemoryStudentsRepository implements StudentsRepository {
  public students: Student[] = []

  async create(data: {
    userId: string
    rga: string
    uniqueRegister?: string | undefined
  }) {
    const student: Student = {
      id: randomUUID(),
      rga: data.rga,
      unique_register: data.uniqueRegister ? data.uniqueRegister : null,
      user_id: data.userId,
    }

    this.students.push(student)
    return student
  }

  async findByRga(rga: string) {
    const student = this.students.find((student) => student.rga === rga)
    if (!student) return null
    return student
  }
}
