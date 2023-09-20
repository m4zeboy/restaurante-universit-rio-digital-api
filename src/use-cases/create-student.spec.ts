import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryStudentsRepository } from '@/repositories/in-memory/in-memory-students-repository'
import { CreateStudentUseCase } from './create-student'

let usersRepository: InMemoryUsersRepository
let studentsRepository: InMemoryStudentsRepository
let sut: CreateStudentUseCase

describe('Create Student Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    studentsRepository = new InMemoryStudentsRepository()
    sut = new CreateStudentUseCase(usersRepository, studentsRepository)
  })

  it('should be able to create a student', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: 'password_hash',
      role: 'STUDENT',
    })
    const { student } = await sut.execute({
      rga: '2023.0000.00-0',
      userId: 'user-1',
    })
    expect(student.id).toEqual(expect.any(String))
  })
})
