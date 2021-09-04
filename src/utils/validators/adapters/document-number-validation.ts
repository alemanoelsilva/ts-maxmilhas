import { isCpf } from 'node-simple-validator'
import { IDocumentNumberValidation } from '../../../presentation/protocols/validation'

export class DocumentNumberValidation implements IDocumentNumberValidation {
  validate(documentNumber: string): boolean {
    const isValid = isCpf(documentNumber)
    return isValid
  }
}
