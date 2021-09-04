import { DocumentNumberValidation } from './document-number-validation'
import nodeSimpleValidator from 'node-simple-validator'

jest.mock('node-simple-validator', () => ({
  isCpf(): boolean {
    return true
  }
}))

describe('Utils - Document Number Validation', () => {
  it('should return true when document number is valid', () => {
    const documentNumberValidation = new DocumentNumberValidation()

    const response = documentNumberValidation.validate('787.187.181-16')

    expect(response).toBeTruthy()
  })

  it('should return false when document number is invalid', () => {
    jest.spyOn(nodeSimpleValidator, 'isCpf').mockReturnValueOnce(false)
    const documentNumberValidation = new DocumentNumberValidation()

    const response = documentNumberValidation.validate('787.187.181-16')

    expect(response).toBeFalsy()
  })
})
