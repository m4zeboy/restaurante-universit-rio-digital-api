export class YouAreNotAStudentError extends Error {
  constructor() {
    super(
      'You must have be a registered student before you create a user with student role.',
    )
  }
}
