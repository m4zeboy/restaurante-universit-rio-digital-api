import { PrismaWalletsRepository } from '@/repositories/prisma/prisma-wallets-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetWalletBalanceUseCase } from '../get-wallet-balance'

export function makeGetWalletBalance() {
  const walletsRepository = new PrismaWalletsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetWalletBalanceUseCase(
    walletsRepository,
    usersRepository,
  )
  return useCase
}
