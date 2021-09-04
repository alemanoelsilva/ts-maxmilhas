export interface IValidationAdapter {
  validate: (documentNumber: string) => boolean
}
