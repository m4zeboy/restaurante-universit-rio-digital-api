import { PrismaWalletsRepository } from '@/repositories/prisma/prisma-wallets-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RechargeWalletUseCase } from '../recharge-wallet'
import { PrismaWalletRechargesRepository } from '@/repositories/prisma/prisma-wallet-recharges'

export function makeRechargeWallet() {
  const walletsRepository = new PrismaWalletsRepository()
  const walletRechargesRepository = new PrismaWalletRechargesRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new RechargeWalletUseCase(
    walletsRepository,
    usersRepository,
    walletRechargesRepository,
  )
  return useCase
}
