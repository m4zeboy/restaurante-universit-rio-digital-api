import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryStudentsRepository } from '@/repositories/in-memory/in-memory-students-repository'
import { CreateStudentUseCase } from '../create-student'
import { StudentAlreadyExistsError } from '../errors/student-already-exists'
import { InMemoryUniversityServersRepository } from '@/repositories/in-memory/in-memory-univeresity-servers-repository'

let studentsRepository: InMemoryStudentsRepository
let universityServersRepository: InMemoryUniversityServersRepository
let sut: CreateStudentUseCase

describe('Create Student Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    universityServersRepository = new InMemoryUniversityServersRepository()
    sut = new CreateStudentUseCase(
      studentsRepository,
      universityServersRepository,
    )
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
