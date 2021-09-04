import { DocumentNumberValidator } from './document-number-validator'

describe('Validator - Document Number Validator', () => {
  it('Should return true when document number is valid', () => {
    const sut = new DocumentNumberValidator()

    const documentNumber = '787.187.181-16'

    const response = sut.validate(documentNumber)

    expect(response).toBeTruthy()
  })
})
