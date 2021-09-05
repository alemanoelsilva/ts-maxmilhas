export interface IAddBlacklistBusiness {
  add: (documentNumber: string) => Promise<void>
}
