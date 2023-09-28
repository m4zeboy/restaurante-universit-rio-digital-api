import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

import { UserAlreadyExistsError } from './errors/user-already-exists'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryStudentsRepository } from '@/repositories/in-memory/in-memory-students-repository'
import { InMemoryUniversityServersRepository } from '@/repositories/in-memory/in-memory-univeresity-servers-repository'

let usersRepository: InMemoryUsersRepository
let studentsRepository: InMemoryStudentsRepository
let universityServersRepository: InMemoryUniversityServersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    studentsRepository = new InMemoryStudentsRepository()
    universityServersRepository = new InMemoryUniversityServersRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(
      usersRepository,
      studentsRepository,
      universityServersRepository,
    )
  })

  it('should be able to register a user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      passport: 'john.doe',
      password: 'password',
      role: 'USER',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to register a student', async () => {
    await studentsRepository.create({
      rga: '2022.0743.004-6',
      passport: 'moises.azevedo',
    })

    const { user } = await sut.execute({
      name: 'Moisés Silva de Azevedo',
      passport: 'moises.azevedo',
      password: 'password',
      role: 'STUDENT',
    })
    expect(user.id).toEqual(expect.any(String))
    expect(user.role).toEqual('STUDENT')
  })

  it('should be able to register a university server', async () => {
    await universityServersRepository.create({
      siape: '1234567',
      passport: 'maria.silva',
    })

    const { user } = await sut.execute({
      name: 'Maria Silva',
      passport: 'maria.silva',
      password: 'password',
      role: 'UNIVERSITY_SERVER',
    })
    expect(user.id).toEqual(expect.any(String))
    expect(user.role).toEqual('UNIVERSITY_SERVER')
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      passport: 'john.doe',
      password: 'password',
      role: 'USER',
    })

    const isPasswordCorrectlyHashed = await compare(
      'password',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same passport twice', async () => {
    const passport = 'john.doe'

    await sut.execute({
      name: 'John Doe',
      passport,
      password: 'password',
      role: 'USER',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        passport,
        password: 'password',
        role: 'USER',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
