import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: await hash('password', 6),
      role: 'USER',
    })

    const { user } = await sut.execute({
      passport: 'john.doe',
      password: 'password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    await usersRepository.create({
      name: 'John Doe',
      passport: 'john.doe',
      password_hash: await hash('password', 6),
      role: 'USER',
    })

    await expect(() =>
      sut.execute({
        passport: 'wrong-passport',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

    await expect(() =>
      sut.execute({
        passport: 'john.doe',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
