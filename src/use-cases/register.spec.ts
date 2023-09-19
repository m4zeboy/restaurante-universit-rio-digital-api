import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

import { UserAlreadyExistsError } from './errors/user-already-exists'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      passport: 'john.doe',
      password: 'password',
      role: 'USER',
    })
    expect(user.id).toEqual(expect.any(String))
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
