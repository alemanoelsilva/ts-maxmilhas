import { IBlacklistModel } from '../models/blacklist'

export interface IAddBlacklist {
  add: (blacklist: IBlacklistModel) => Promise<any>
}
