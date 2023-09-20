import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryUniversityServersRepository } from '@/repositories/in-memory/in-memory-univeresity-servers-repository'
import { CreateUniversityServerUseCase } from './create-university-server'

let usersRepository: InMemoryUsersRepository
let universityServersRepository: InMemoryUniversityServersRepository
let sut: CreateUniversityServerUseCase

describe('Create University Server Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    universityServersRepository = new InMemoryUniversityServersRepository()
    sut = new CreateUniversityServerUseCase(
      usersRepository,
      universityServersRepository,
    )
  })

  it('should be able to create a university server', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: 'password_hash',
      role: 'UNIVERSITY_SERVER',
    })
    const { universityServer } = await sut.execute({
      siape: '2023.0000.00-0',
      userId: 'user-1',
    })
    expect(universityServer.id).toEqual(expect.any(String))
  })
})
