import { IAddBlacklist } from '../../../domain/usecases/add-blacklist'
import { IBlacklistModel } from '../../../domain/models/blacklist'
import { MongoHelper } from '../helpers/mongo-helper'
import { IGetNextBlacklistVersion } from '../../../domain/usecases/get-next-blacklist-version'

export class BlacklistMongodbRepository implements IAddBlacklist, IGetNextBlacklistVersion {
  async add(blacklist: IBlacklistModel): Promise<boolean> {
    const blacklistCollection = await MongoHelper.getCollection('blacklist')
    await blacklistCollection.insertOne(blacklist)
    return true
  }

  async getNextVersion(documentNumber: string): Promise<string> {
    const blacklistCollection = await MongoHelper.getCollection('blacklist')
    const blacklist = await blacklistCollection.findOne({ documentNumber })
    return String(Number(blacklist?.version || 0) + 1)
  }
}
