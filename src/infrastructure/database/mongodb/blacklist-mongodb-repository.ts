import { IDbAddBlacklist } from '../../../domain/usecases/db-add-blacklist'
import { IBlacklistModel } from '../../../domain/models/blacklist'

export class BlacklistMongodbRepository implements IDbAddBlacklist {
  constructor(private readonly mongoHelper: any) {}

  async add(blacklist: IBlacklistModel): Promise<boolean> {
    const blacklistCollection = await this.mongoHelper.getCollection('blacklist')

    await blacklistCollection.insert(blacklist)

    return true
  }
}
