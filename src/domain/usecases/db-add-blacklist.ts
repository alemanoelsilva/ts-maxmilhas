import { IBlacklistModel } from '../models/blacklist'

export interface IDbAddBlacklist {
  add: (blacklist: IBlacklistModel) => Promise<boolean>
}
