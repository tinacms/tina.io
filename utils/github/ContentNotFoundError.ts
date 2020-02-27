export default class ContentNotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ContentNotFoundError'
  }
}
