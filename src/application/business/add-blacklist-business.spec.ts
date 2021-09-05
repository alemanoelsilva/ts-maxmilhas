import { AddBlacklistBusiness } from './add-blacklist-business'
import { IGetNextBlacklistVersionRepository } from '../protocols/get-next-blacklist-version-repository'
import { IAddBlacklistRepository } from '../protocols/add-blacklist-repository'

interface ITypes {
  sut: AddBlacklistBusiness
  addBlacklistRepositoryStub: IAddBlacklistRepository
  getNextBlacklistVersionRepositoryStub: IGetNextBlacklistVersionRepository
}

const makeGetNextVersion = (): IGetNextBlacklistVersionRepository => {
  class GetNextBlacklistVersionStub implements IGetNextBlacklistVersionRepository {
    async getNextVersion(): Promise<string> {
      return new Promise(resolve => resolve('1'))
    }
  }
  return new GetNextBlacklistVersionStub()
}

const makeAddBlacklist = (): IAddBlacklistRepository => {
  class AddBlackListStub implements IAddBlacklistRepository {
    async add(): Promise<any> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new AddBlackListStub()
}

const makeSut = (): ITypes => {
  const addBlacklistRepositoryStub = makeAddBlacklist()
  const getNextBlacklistVersionRepositoryStub = makeGetNextVersion()

  const sut = new AddBlacklistBusiness(addBlacklistRepositoryStub, getNextBlacklistVersionRepositoryStub)

  return {
    sut,
    addBlacklistRepositoryStub,
    getNextBlacklistVersionRepositoryStub
  }
}

describe('Application - Blacklist Business', () => {
  describe('Add Blacklist Business', () => {
    it('should call internal methods to add blacklist', async () => {
      const { sut, addBlacklistRepositoryStub, getNextBlacklistVersionRepositoryStub } = makeSut()

      const getNextVersionSpy = jest.spyOn(getNextBlacklistVersionRepositoryStub, 'getNextVersion')
      const addSpy = jest.spyOn(addBlacklistRepositoryStub, 'add')

      const documentNumber: string = '999.999.999-99'

      await sut.add(documentNumber)

      expect(getNextVersionSpy).toBeCalledWith(documentNumber)
      expect(addSpy).toBeCalledWith({
        documentNumber,
        version: '1'
      })
    })

    it('should throw when getNextVersion method throws', async () => {
      const { sut, getNextBlacklistVersionRepositoryStub } = makeSut()

      const error = new Error('Fake getNextVersion error')

      jest.spyOn(getNextBlacklistVersionRepositoryStub, 'getNextVersion').mockRejectedValue(error)

      const documentNumber: string = '999.999.999-99'

      const promise = sut.add(documentNumber)

      await expect(promise).rejects.toThrow()
    })

    it('should throw when add method throws', async () => {
      const { sut, addBlacklistRepositoryStub } = makeSut()

      const error = new Error('Fake addBlacklistStub error')

      jest.spyOn(addBlacklistRepositoryStub, 'add').mockRejectedValue(error)

      const documentNumber: string = '999.999.999-99'

      const promise = sut.add(documentNumber)

      await expect(promise).rejects.toThrow()
    })
  })
})
