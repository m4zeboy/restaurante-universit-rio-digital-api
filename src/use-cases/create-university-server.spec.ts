import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUniversityServersRepository } from '@/repositories/in-memory/in-memory-univeresity-servers-repository'
import { CreateUniversityServerUseCase } from './create-university-server'
import { UniversityServerAlreadyExistsError } from './errors/university-server-already-exists'

let universityServersRepository: InMemoryUniversityServersRepository
let sut: CreateUniversityServerUseCase

describe('Create University Server Use Case', () => {
  beforeEach(() => {
    universityServersRepository = new InMemoryUniversityServersRepository()
    sut = new CreateUniversityServerUseCase(universityServersRepository)
  })

  it('should be able to create a university server', async () => {
    const { universityServer } = await sut.execute({
      siape: '2023.0000.00-0',
      passport: 'passport.example',
    })
    expect(universityServer.id).toEqual(expect.any(String))
  })

  it('should not be able to create university server with same SIAPE twice', async () => {
    await sut.execute({
      siape: '2023.0000.00-0',
      passport: 'passport.example',
    })
    await expect(() =>
      sut.execute({
        siape: '2023.0000.00-0',
        passport: 'passport.example',
      }),
    ).rejects.toBeInstanceOf(UniversityServerAlreadyExistsError)
  })
})
