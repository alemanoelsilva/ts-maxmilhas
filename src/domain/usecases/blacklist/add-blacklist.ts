export interface IAddBlacklist {
  add: (documentNumber: string) => Promise<void>
}
