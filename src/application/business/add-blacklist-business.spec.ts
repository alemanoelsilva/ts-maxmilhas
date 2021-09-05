import { AddBlacklistBusiness } from './add-blacklist-business'
import { IAddBlacklist } from '../../domain/usecases/blacklist/add-blacklist'
import { IGetNextBlacklistVersion } from '../../domain/usecases/blacklist/get-next-blacklist-version'

interface ITypes {
  sut: AddBlacklistBusiness
  addBlacklistStub: IAddBlacklist
  getNextVersionStub: IGetNextBlacklistVersion
}

const makeGetNextVersion = (): IGetNextBlacklistVersion => {
  class GetNextBlacklistVersionStub implements IGetNextBlacklistVersion {
    async getNextVersion(): Promise<string> {
      return new Promise(resolve => resolve('1'))
    }
  }
  return new GetNextBlacklistVersionStub()
}

const makeAddBlacklist = (): IAddBlacklist => {
  class AddBlackListStub implements IAddBlacklist {
    async add(): Promise<any> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new AddBlackListStub()
}

const makeSut = (): ITypes => {
  const addBlacklistStub = makeAddBlacklist()
  const getNextVersionStub = makeGetNextVersion()

  const sut = new AddBlacklistBusiness(addBlacklistStub, getNextVersionStub)

  return {
    sut,
    addBlacklistStub,
    getNextVersionStub
  }
}

describe('Application - Blacklist Business', () => {
  describe('Add Blacklist Business', () => {
    it('should call internal methods to add blacklist', async () => {
      const { sut, addBlacklistStub, getNextVersionStub } = makeSut()

      const getNextVersionSpy = jest.spyOn(getNextVersionStub, 'getNextVersion')
      const addSpy = jest.spyOn(addBlacklistStub, 'add')

      const documentNumber: string = '999.999.999-99'

      await sut.add(documentNumber)

      expect(getNextVersionSpy).toBeCalledWith(documentNumber)
      expect(addSpy).toBeCalledWith({
        documentNumber,
        version: '1'
      })
    })

    it('should throw when getNextVersion method throws', async () => {
      const { sut, addBlacklistStub, getNextVersionStub } = makeSut()

      const error = new Error('Fake getNextVersion error')

      jest.spyOn(getNextVersionStub, 'getNextVersion').mockRejectedValue(error)
      jest.spyOn(addBlacklistStub, 'add')

      const documentNumber: string = '999.999.999-99'

      const promise = sut.add(documentNumber)

      await expect(promise).rejects.toThrow()
    })

    it('should throw when add method throws', async () => {
      const { sut, addBlacklistStub, getNextVersionStub } = makeSut()

      const error = new Error('Fake addBlacklistStub error')

      jest.spyOn(getNextVersionStub, 'getNextVersion')
      jest.spyOn(addBlacklistStub, 'add').mockRejectedValue(error)

      const documentNumber: string = '999.999.999-99'

      const promise = sut.add(documentNumber)

      await expect(promise).rejects.toThrow()
    })
  })
})
