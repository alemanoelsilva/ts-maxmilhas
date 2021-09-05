export interface IGetNextBlacklistVersionRepository {
  getNextVersion: (documentNumber: string) => Promise<string>
}
