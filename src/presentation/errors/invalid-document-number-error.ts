export class InvalidDocumentNumberError extends Error {
  constructor () {
    super('Document provided is not valid')
    this.name = 'InvalidDocumentNumberError'
  }
}
