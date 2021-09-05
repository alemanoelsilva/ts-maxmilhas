export interface IGetNextBlacklistVersion {
  getNextVersion: (documentNumber: string) => Promise<string>
}
