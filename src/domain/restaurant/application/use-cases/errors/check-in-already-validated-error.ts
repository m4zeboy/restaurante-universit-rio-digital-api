import { UseCaseError } from "@/core/errors/use-case-error";

export class CheckInAlreadyValidatedError extends Error implements UseCaseError {
  constructor() {
    super('The check has already been validated.')
  }
}
