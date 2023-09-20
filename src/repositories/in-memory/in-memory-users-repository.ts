import { Role, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  async create(data: {
    id?: string
    name: string
    passport: string
    password_hash: string
    role: Role
  }) {
    const user: User = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      passport: data.passport,
      password_hash: data.password_hash,
      role: data.role,
    }
    this.items.push(user)
    return user
  }

  async findByPassport(passport: string) {
    const user = this.items.find((user) => user.passport === passport)
    if (!user) {
      return null
    }
    return user
  }

  async findById(userId: string) {
    const user = this.items.find((user) => user.id === userId)
    if (!user) {
      return null
    }
    return user
  }
}
