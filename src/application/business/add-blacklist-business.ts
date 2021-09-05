import { IBlacklistModel } from '../../domain/models/blacklist'
import { IAddBlacklist } from '../../domain/usecases/blacklist/add-blacklist'
import { IAddBlacklistRepository } from '../protocols/add-blacklist-repository'
import { IGetNextBlacklistVersionRepository } from '../protocols/get-next-blacklist-version-repository'

export class AddBlacklistBusiness implements IAddBlacklist {
  constructor(
    private readonly addBlacklist: IAddBlacklistRepository,
    private readonly getBlacklist: IGetNextBlacklistVersionRepository
  ) {}

  async add(documentNumber: string): Promise<void> {
    const version: string = await this.getBlacklist.getNextVersion(documentNumber)

    const blacklist: IBlacklistModel = {
      documentNumber,
      version
    }

    await this.addBlacklist.add(blacklist)
  }
}
