import { Role, User } from '@prisma/client'

export interface UsersRepository {
  create(data: {
    id?: string
    name: string
    passport: string
    password_hash: string
    role: Role
  }): Promise<User>

  findByPassport(passport: string): Promise<User | null>

  findById(userId: string): Promise<User | null>
}
