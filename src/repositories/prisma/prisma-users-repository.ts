import { Role } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: { name: string; passport: string; password_hash: string; role: Role; }) {
    const user = await prisma.user.create({ data })
    return user
  }
  async findByPassport(passport: string) {
    const user = await prisma.user.findUnique({ where: { passport } })
    return user
  }
  async findById(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    return user
  }

}