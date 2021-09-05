import { IAddBlacklist } from '../../../domain/usecases/add-blacklist'
import { IBlacklistModel } from '../../../domain/models/blacklist'
import { MongoHelper } from '../helpers/mongo-helper'

export class BlacklistMongodbRepository implements IAddBlacklist {
  async add(blacklist: IBlacklistModel): Promise<boolean> {
    const blacklistCollection = await MongoHelper.getCollection('blacklist')
    await blacklistCollection.insertOne(blacklist)
    return true
  }
}
