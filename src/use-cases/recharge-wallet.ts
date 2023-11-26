import { WalletRecharge } from '@prisma/client'
import { WalletsRepository } from '@/repositories/wallets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { WalletRechargesRepository } from '@/repositories/wallet-recharges-repository'
import { InvalidRechargeAmountError } from './errors/invalid-recharge-amount'

interface RechargeWalletUseCaseRequest {
  userId: string
  amount: number
}

interface RechargeWalletUseCaseReply {
  walletRecharge: WalletRecharge
}

/*
cadastrar um prato
atribuir um prato a uma data
poder reutilizar um prato para mais de uma data


o usuário faz a requisição para recarregar a carteira

informa o valor desejado

seleciona o tipo de pagamento

se for cartão informa os dados do cartão

o sistema verifica os dados do cartão. se estiverem errados o pagamento é cancelado. 

o sistema verifica se o cartão tem saldo. se não houver saldo o pagemento é cancelado.

um registro de recarga e pagamento são criados

o valor é acrescentado a carteira do usuário

--- 
se for pix

o sistema gera um codigo qr e cria uma recarga e um pagamento com status pendente

o sistema aguarda o usuário realizar o pagamento.

o status muda para aprovado

o valor é acrescentado a carteira do usuário

*/

export class RechargeWalletUseCase {
  constructor(
    private walletsRepository: WalletsRepository,
    private usersRepository: UsersRepository,
    private walletRechargesRepository: WalletRechargesRepository,
  ) { }

  async execute(
    data: RechargeWalletUseCaseRequest,
  ): Promise<RechargeWalletUseCaseReply> {
    const doesUserExist = await this.usersRepository.findById(data.userId)

    if (!doesUserExist) {
      throw new ResourceNotFoundError()
    }

    const wallet = await this.walletsRepository.findByUserId(data.userId)

    if (!wallet) {
      throw new ResourceNotFoundError()
    }

    if (data.amount <= 0) {
      throw new InvalidRechargeAmountError()
    }

    const walletRecharge = await this.walletRechargesRepository.create({
      amount: data.amount,
      walletId: wallet.id,
    })

    await this.walletsRepository.updateBalance({
      walletId: wallet.id,
      amount: data.amount,
    })

    return { walletRecharge }
  }
}
