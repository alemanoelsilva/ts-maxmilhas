import { IBlacklistModel } from '../../../domain/models/blacklist'
import { MongoHelper } from '../helpers/mongo-helper'
import { IAddBlacklistRepository } from '../../../application/protocols/add-blacklist-repository'
import { IGetNextBlacklistVersionRepository } from '../../../application/protocols/get-next-blacklist-version-repository'

export class BlacklistMongodbRepository implements IAddBlacklistRepository, IGetNextBlacklistVersionRepository {
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
