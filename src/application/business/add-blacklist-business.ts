import { IAddBlacklist } from '../../domain/usecases/blacklist/add-blacklist'
import { IGetNextBlacklistVersion } from '../../domain/usecases/blacklist/get-next-blacklist-version'
import { IAddBlacklistBusiness } from '../protocols/add-blacklist'
import { IBlacklistModel } from '../../domain/models/blacklist'

export class AddBlacklistBusiness implements IAddBlacklistBusiness {
  constructor(
    private readonly addBlacklist: IAddBlacklist,
    private readonly getBlacklist: IGetNextBlacklistVersion
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
