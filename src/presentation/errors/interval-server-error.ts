export class IntervalServerError extends Error {
  constructor (error: Error) {
    super(`Internal Server Error: ${error.message}`)
    this.name = 'IntervalServerError'
  }
}
