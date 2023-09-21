import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryStudentsRepository } from '@/repositories/in-memory/in-memory-students-repository'
import { CreateStudentUseCase } from './create-student'
import { StudentAlreadyExistsError } from './errors/student-already-exists'

let studentsRepository: InMemoryStudentsRepository
let sut: CreateStudentUseCase

describe('Create Student Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    sut = new CreateStudentUseCase(studentsRepository)
  })

  it('should be able to create a student', async () => {
    const { student } = await sut.execute({
      passport: 'passport.example',
      rga: '2023.0000.00-0',
    })
    expect(student.id).toEqual(expect.any(String))
  })

  it('should not be able to create student with same RGA twice', async () => {
    await sut.execute({
      passport: 'passport.example',
      rga: '2023.0000.00-0',
    })
    await expect(() =>
      sut.execute({
        passport: 'passport.example',
        rga: '2023.0000.00-0',
      }),
    ).rejects.toBeInstanceOf(StudentAlreadyExistsError)
  })
})
