import { IBlacklistModel } from '../../domain/models/blacklist'

export interface IAddBlacklistRepository {
  add: (blacklist: IBlacklistModel) => Promise<boolean>
}
