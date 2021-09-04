import { isCpf } from 'node-simple-validator'
import { IValidationAdapter } from '../../../presentation/protocols/validation-adapter'

export class DocumentNumberValidation implements IValidationAdapter {
  validate(documentNumber: string): boolean {
    const isValid = isCpf(documentNumber)
    return isValid
  }
}
