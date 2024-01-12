import { Either, success } from "@/core/either";

export interface UseCaseRequest {}

export type UseCaseReply = Either<null, {}>

export class UseCase {
  async execute({}: UseCaseRequest): Promise<UseCaseReply> {
    return success({})
  }
}
