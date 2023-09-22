import { PrismaWalletsRepository } from '@/repositories/prisma/prisma-wallets-repository'
import { CreateWalletUseCase } from '../create-wallet'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCreateWallet() {
  const walletsRepository = new PrismaWalletsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new CreateWalletUseCase(walletsRepository, usersRepository)
  return useCase
}
