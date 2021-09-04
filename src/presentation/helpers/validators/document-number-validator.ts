import { isCpf } from 'node-simple-validator'
import { Validation } from '../../protocols/validation'

export class DocumentNumberValidator implements Validation {
  validate(documentNumber: string): boolean {
    const isValid = isCpf(documentNumber)
    return isValid
  }
}
