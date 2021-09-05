import { IDbAddBlacklist } from '../../../domain/usecases/db-add-blacklist'
import { IBlacklistModel } from '../../../domain/models/blacklist'
import { MongoHelper } from '../helpers/mongo-helper'

export class BlacklistMongodbRepository implements IDbAddBlacklist {
  async add(blacklist: IBlacklistModel): Promise<boolean> {
    const blacklistCollection = await MongoHelper.getCollection('blacklist')
    await blacklistCollection.insertOne(blacklist)
    return true
  }
}
