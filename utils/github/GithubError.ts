export class GithubError extends Error {
  status: number
  constructor(message, status) {
    super(message)
    this.message = message
    this.status = status
  }
}
