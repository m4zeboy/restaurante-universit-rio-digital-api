export class YouAreNotAUniversityServerError extends Error {
  constructor() {
    super(
      'You must have be a registered university server before you create a user with university server role',
    )
  }
}
